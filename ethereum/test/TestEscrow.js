var should = require('chai').should();
const Escrows = artifacts.require("Escrows");
var BigNumber = require("BigNumber.js")
const { promisify } = require('util');

const address0 = '0x0000000000000000000000000000000000000000';

//convert callback function to promise
const getGasPrice = promisify(web3.eth.getGasPrice);


//settted gas price
let gp = 20000000000;
let tradeId = 0;

let fee = 50; //fee/10000 is the rate


let expiry = 30000; //seconds


//for test tmp
let isExist;
let tradeHash;
let gas;

let feeOfCreateEscrow;
let feeOfRelease;
let feeOfResolveDispute;
let feeOfDisableSellerCancel;
let feeOfSellerCancel;
let feeOfBuyerCancel;

let preBalance;

let afterBalance;

let expectedBalance;

let preBuyerBalance;


//let gasPrice = 10000000000;
//strange problems
let gasPrice = 100000000000;

contract('test escrow', async(accounts) => {
    let instance;
    let owner = accounts[0];
    let seller = accounts[5];
    let platform = accounts[9];
    let arbitrator = accounts[2];
    let buyer = accounts[3];
    let paymentWindow = 5; //seconds
    let value = web3.toWei(0.3, 'ether');
    let rate = 50;


    //basically every describe contain one escrow, so after every describe tradeId should ++;

    //Notice: only if the payer release fund(or u can say he said OK), this escrow is ended
    describe('create and directly release', async() => {
        it('creat', async() => {
            let gasPriceBig = await getGasPrice();
            //  gasPrice = gasPriceBig.toNumber();
            console.log('gas price is ' + gasPrice + ' wei');


            instance = await Escrows.deployed();


            //estimate gas

            gas = await instance.createEscrow.estimateGas(tradeId, seller, buyer, arbitrator, value, paymentWindow, rate, { from: seller, value: value });
            feeOfCreateEscrow = logGas('createEscrow', gas);






            //before 
            preBalance = await web3.eth.getBalance(seller);


            preBuyerBalance = await web3.eth.getBalance(buyer);



            //seller createEscrow

            await instance.createEscrow(tradeId, seller, buyer, arbitrator, value, paymentWindow, rate, { from: seller, value: value });





            tradeHash = await instance.getEscrowHash.call(tradeId, seller, buyer, arbitrator, value, rate);
            console.log(tradeHash);









        });
        it('directly release', async() => {
            //estimate gas
            gas = await instance.release.estimateGas(tradeHash, { from: seller });
            feeOfRelease = logGas('release', gas);


            escrowInfo = await instance.getEscrowInfoByTradeHash.call(tradeHash);
            console.log(escrowInfo);
            isExist = await instance.isEscrowExist.call(tradeHash);
            isExist.should.equal(true, 'create failed');





            //seller release fund
            await instance.release(tradeHash, { from: seller });

            isExist = await instance.isEscrowExist.call(tradeHash);
            isExist.should.equal(false, 'release faild');

            //before 
            afterBalance = await web3.eth.getBalance(seller);


            let afterBuyerBalance = await web3.eth.getBalance(buyer);


            totalFee = value * fee / 10000 + value * rate / 10000;
            console.log("totalFee " + totalFee);

            expectedBalance = preBalance.minus(feeOfCreateEscrow).minus(feeOfRelease).minus(value);
            expectedBalance.toNumber().should.equal(afterBalance.toNumber(), "seller balance wrong");

            expectedBuyerBalance = preBuyerBalance.plus(value - totalFee);
            expectedBuyerBalance.toNumber().should.equal(afterBuyerBalance.toNumber(), "buyer balance wrong");

        });
        /**
        it('u can not create escrow with the same trade ID and same other info', async() => {
             //this should throw, because u can not create escrow with same tradeId
            try {
                await instance.createEscrow(tradeId, seller, buyer, arbitrator, value, paymentWindow, rate, { from: seller, value: value });
            } catch (error) {
                console.log(error.message);
                should.exist(error);
            }

        });**/
        tradeId++;
    })

    describe('buyer finish his job, seller did not give, buyer ask for arbitrator, arbitrator judge to give buyer ether',
        async() => {
            it('buyer finish his job and diable seller cancel, so that seller can not cancel', async() => {
                await instance.createEscrow(tradeId, seller, buyer, arbitrator, value, paymentWindow, rate, { from: seller, value: value });
                tradeHash = await instance.getEscrowHash.call(tradeId, seller, buyer, arbitrator, value, rate);



                gas = await instance.disableSellerCancel.estimateGas(tradeHash, { from: buyer });
                feeOfDisableSellerCancel = logGas('disableSellerCancel', gas);

                let preBalance = balance(buyer);
                console.log('!!pre balance ' + preBalance.toNumber());

                await instance.disableSellerCancel(tradeHash, { from: buyer });
                let afterBalance = balance(buyer);
                console.log('!!after balance ' + afterBalance.toNumber());

                //Notice: when use ganache always use this to determin gas price, or directly use gas price in the trasaction options
                console.log('!! gasprice ' + afterBalance.minus(preBalance).div(gas).toNumber());
                afterBalance.toNumber().should.equal(preBalance.minus(feeOfDisableSellerCancel).toNumber(), 'test disablaSeller');


                //this should throw
                try {
                    await instance.sellerCancel(tradeHash, { from: seller });
                } catch (error) {
                    console.log(error.message);
                    should.exist(error);
                }



            });
            it('buyer appeal arbitration, and arbitrtor give him what he want', async() => {

                escrowInfo = await instance.getEscrowInfoByTradeHash.call(tradeHash);
                escrowInfo[5].should.equal(false, 'appeal error');




                //this should throw
                //arbitrator can not arbitrate before petition
                try {
                    await instance.resolveDispute(tradeHash, true, { from: arbitrator });
                } catch (error) {
                    console.log(error.message);
                    should.exist(error);
                }


                await instance.appealArbitration(tradeHash, { from: buyer });



                //estimate gas
                gas = await instance.resolveDispute.estimateGas(tradeHash, true, { from: arbitrator });
                feeOfResolveDispute = logGas('resolveDispute', gas);



                escrowInfo = await instance.getEscrowInfoByTradeHash.call(tradeHash);
                escrowInfo[5].should.equal(true, 'appeal error');
                escrowInfo[3].should.equal(arbitrator);

                let isExist = await instance.isEscrowExist.call(tradeHash);
                isExist.should.equal(true);



                let preBalance = await balance(buyer);
                let preArbitratorBalance = await balance(arbitrator);

                await instance.resolveDispute(tradeHash, true, { from: arbitrator });


                let afterBalance = await balance(buyer);
                let afterArbitratorBalance = await balance(arbitrator);
                console.log('pre arbitrator balance', preArbitratorBalance.toNumber());

                afterBalance.toNumber().should.equal(preBalance.plus(value)
                    .minus(rate / 10000 * value + fee / 10000 * value).toNumber(), 'check buyer balance');

                afterArbitratorBalance.toNumber().should.equal(preArbitratorBalance
                    .minus(feeOfResolveDispute)
                    .plus(rate / 10000 * value).toNumber(), 'check the arbitrator balance');

            });
            tradeId++;

        });
    //if seller did not ask for arbitration, his ether will be locked in this contract forever
    describe('buyer did not finish his job, but he disable seller cancel, seller ask arbitrator to resolve', async() => {
        it("new escrow create", async() => {
            await instance.createEscrow(tradeId, seller, buyer, arbitrator, value, paymentWindow, rate, { from: seller, value: value });
            tradeHash = await instance.getEscrowHash.call(tradeId, seller, buyer, arbitrator, value, rate);

        });
        it('buyer disable seller cancel', async() => {
            await instance.disableSellerCancel(tradeHash, { from: buyer });


        });
        it('seller appeal to arbitration', async() => {
            await instance.appealArbitration(tradeHash, { from: seller });

        });
        it('arbitrator do fair arbitration', async() => {

            let preBalance = await balance(seller);
            await instance.resolveDispute(tradeHash, false, { from: arbitrator });
            let afterBalance = await balance(seller);

            afterBalance.toNumber().should.equal(preBalance.plus(value)
                .minus(rate / 10000 * value + fee / 10000 * value).toNumber(), 'check seller balance');
        })
        tradeId++;
    });

   
    describe('buyer can cancel any time he want', async() => {
        it("new escrow create", async() => {
            await instance.createEscrow(tradeId, seller, buyer, arbitrator, value, paymentWindow, rate, { from: seller, value: value });
            tradeHash = await instance.getEscrowHash.call(tradeId, seller, buyer, arbitrator, value, rate);

        });
        it('buyer cancel', async() => {

            gas = await instance.buyerCancel.estimateGas(tradeHash, { from: buyer });
            feeOfBuyerCancel = logGas('buyerCancel', gas);

            let preBalance = await balance(seller);
            await instance.buyerCancel(tradeHash, { from: buyer });
            let afterBalance = await balance(seller);
            afterBalance.toNumber().should.equal(preBalance.plus(value)
                .minus(fee / 10000 * value).toNumber(), 'check seller balance');
            console.log("seller cancel works proper")

        });
    });

    describe('test change fee', async() => {
        it('test permission control', async() => {
            try {
                await instance.changeFee(30, { from: seller });
            } catch (error) {
                console.log(error.message);
                should.exist(error);
            }
        });
        it('change fee', async() => {
            await instance.changeFee(30, { from: owner });
            let fee = await instance.fee.call();
            fee.toNumber().should.equal(30, 'fee set error');
        })
        it('change fee again so that delay function works proper', async() => {
            await instance.changeFee(50, { from: owner });
            let fee = await instance.fee.call();
            fee.toNumber().should.equal(50, 'fee set error');
        })
    });

    describe('withdraw fee to platform bank', async() => {
        it('test permission control', async() => {
            try {
                await instance.withdraw(platform, { from: seller });
            } catch (error) {
                console.log(error.message);
                should.exist(error);
            }
        });
        it('withdraw', async() => {
            let preBalance = await balance(platform);
            let contractBalance = await balance(instance.address);
            await instance.withdraw(platform, { from: owner });
            let afterBalance = await balance(platform);
            afterBalance.toNumber().should.equal(preBalance.plus(contractBalance).toNumber());
        });
    });

    //put delay test finally so that can mitigate other test's effect to it
     describe('if buyer did not pay in time(the payment time window setted by seller), seller can cancel escrow', async() => {
        let delayTradeHash;
        it("new escrow create", async() => {
            await instance.createEscrow(tradeId, seller, buyer, arbitrator, value, paymentWindow, rate, { from: seller, value: value });
            delayTradeHash = await instance.getEscrowHash.call(tradeId, seller, buyer, arbitrator, value, rate);
            //can only put here for the delay function
            tradeId++;
        });
        it('seller can not cancel directly', async() => {
            try {
                await instance.sellerCancel(delayTradeHash, { from: seller });
            } catch (error) {
                console.log(error.message);
                should.exist(error);
            }

        });
        it('seller can cancel after paymentWindow', async() => {
            setTimeout(async() => {
                gas = await instance.sellerCancel.estimateGas(delayTradeHash, { from: seller });
                feeOfSellerCancel = logGas('sellerCancel', gas);
            }, 6000);

            setTimeout(async() => {
                console.log('waiting over.');
                let preBalance = await balance(seller);

                //estimate gas


                await instance.sellerCancel(delayTradeHash, { from: seller });
                let afterBalance = await balance(seller);

                afterBalance.toNumber().should.equal(preBalance.plus(value)
                    .minus(feeOfSellerCancel)
                    .minus(fee / 10000 * value).toNumber(), 'check seller balance');
                console.log("seller cancel works proper")

            }, 6050)
        });

    });

});


//util function
function balance(address) {
    return web3.eth.getBalance(address);
}

function logEth(_fee) {
    let fee;
    if (typeof(_fee) == typeof(new BigNumber(1))) {
        fee = web3.fromWei(_fee.toNumber(), 'ether');
    } else {
        fee = web3.fromWei(_fee, 'ether');
    }

    console.log('ether: ' + fee);
}

function logGas(_funcName, _gas) {
    console.log(_funcName);
    console.log('gas: ' + _gas + ' units');
    let fee = _gas * gasPrice;
    console.log('gas cost estimation: ' + web3.fromWei(fee, 'ether') + ' ether');
    return fee;
}