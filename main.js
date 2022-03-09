/**
 * -------------------
 * Malzeme listesi
 * -------------------
 */

let materials = {
    pickle: 1,
    sauce: 5,
    onion: 5,
    tomato: 5,
    bread: 5,
    fries: 5,
    coke: 5,
    meat: 5,
    chicken: 5
}

/**
 * --------------------
 * Default
 * --------------------
 */
var isShopOpen = null;
var offer = null;
var cook_level = null;


/**
 * ---------------
 * Sipariş
 * --------------
 */

function order() {
    return new Promise((resolve, reject) => {
        if (isShopOpen) {
            setTimeout(() => {
                resolve("The Order has been taken!");//siparişin gerçekleşme durumu->resolve ile başarılı döner.
            }, 1000);
        } else {
            reject(" The Order has been denied!");//siparişin gerçekleşmeme durumu->reject ile başarısız döner.
        }
    });
};

/**
 * ---------------------
 * Malzeme stok kontrol
 * --------------------
 */

function checkStock() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let check = true;

            for (let [key, value] of Object.entries(materials)) {
                if (value < 1) {
                    check = false;
                    break;
                }
            }
            if (check) {
                resolve("There is enough stock");//malzemenin olması durumu->resolve ile başarılı döner.
            } else {
                reject("There is no enough stock");//malzemenin olmaması durumu->resolve ile başarısız döner.
            }
        }, 3000);
    });
}

/**
 * -----------------
 * Seçim Kontrolü
 * -----------------
 */

function check_meat_type() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (offer == 'chicken') {
                resolve(offer);//seçimin tavuk olması durumu->resolve ile başarılı döner.
            } else if (offer == 'meat') {
                resolve(offer);//seçimin et olması durumu->resolve ile başarılı döner.
            } else {
                reject("There is no option as you want! " + offer);
            }
        }, 1000);
    });
}

/**
 * --------------------------
 * Eğer seçim köfte ise pişirme derecesi
 * -------------------------
 */

function cook(level) {


    return new Promise((resolve, reject) => {

        let cook_time = 0;

        // console.log(typeof level, 'level');
        // console.log(level, 'level');

        if (level === 1) {
            /**
             * az pismis
             */
            cook_time = 1000;

        } else if (level === 2) {
            /**
             * orta pismis
             */
            cook_time = 3000;

        } else if (level === 3) {
            /**
             * Cok pismis
             */
            cook_time = 4000;
        } else {

            reject("Bilinmeyen Pişirme Seviyesi");
        }
        //
        // console.log('cook_time : ' + cook_time);
        // console.log('cook level : ' + level);

        setTimeout(() => {
            resolve("Cooked!");
        }, cook_time);
    });
}

/**
 * ----------
 * Hamburger hazırlama
 * ----------
 */
function hamburger() {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("The Burger is ready..");
            resolve("The Burger is ready...");//Hazır olmama durumu olmadığı için resolve yeterli oluyor
        }, 2000);
    });
}

/**
 * ----------
 * Patates hazırlama
 * ----------
 */

function fries() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("The Fries are ready...");
            resolve("The Fries are ready...");//Hazır olmama durumu olmadığı için resolve yeterli oluyor
        }, 5000);
    });
}

/**
 * ----------
 * İçecek hazırlama
 * ----------
 */
function drink() {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("The Drink is ready...");//Hazır olmama durumu olmadığı için resolve yeterli oluyor
            resolve("The Drink is ready...");
        }, 2000);
    });
}

/**
 * ----------------
 * sos ve tepsi hazırlama
 * ---------------
 */

function souce() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Added souce and putted on tray");
            resolve(true);//Hazır olmama durumu olmadığı için resolve yeterli oluyor
        }, 1000);
    });
}

/**
 * --------
 * servis
 * --------
 */

function service() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("The Order is ready to take!");
            resolve(true);//Hazır olmama durumu olmadığı için resolve yeterli oluyor
        }, 1000);
    });
}

async function meat_process() {

    console.log("process started");
    /**
     * Et ve tavuk seçimi döner ve pişirme stepleri resolve edilir.
     */

    return new Promise((resolve, reject) => {

        check_meat_type().then(
            (success_meat_type) => {

                console.log('Choosen Type: ' + success_meat_type);


                if (success_meat_type == 'chicken') {

                    /**
                     * Seçim tavuk ise istek buraya düşer
                     */

                    cook(2)
                        .then(
                            (successMessage) => {
                                console.log("Cooked!");
                                resolve("Cooked!");
                            },
                            (errorMessage) => {
                                console.log("Not Cooked!");
                                reject("Not Cooked!");
                            }
                        )
                } else {

                    /**
                     * Seçim et ise istek buraya düşer
                     */

                    console.log('The Choosen meat start cooking');
                    cook(cook_level)
                        .then(
                            (successMessage) => {
                                console.log("Meat Cooked!");
                                resolve("Meat Cooked!");
                            },
                            (errorMessage) => {
                                console.log("Meat Not Cooked! errorMessage:" + errorMessage);
                                reject("Meat Not Cooked!errorMessage:" + errorMessage);
                            });
                }
            },
            (onmessageerror) => {
                /**
                 * Ancak tavuk ve Et disinda birsey secilirse..
                 */
                alert('ERROR  : ' + onmessageerror);

                reject('ERROR  : ' + onmessageerror);
            }
        );
    });

}

async function afterStock() {

    /**
     * Stok var ise hazırlama kısmı başlar,bütün fonksiyonların hazırlığının kontrolü için promise.all fonksiyonu kullanılır
     */

    const results = await Promise.all([meat_process(), hamburger(), fries(), drink()]).then((values) => {
        console.log("All Food Process are done!");
        // console.log(values); //Tüm fonksiyonlardan gelen resolveları array döner
        /**
         *Hazırlıklar tamamlandıktan sonra sos ve tepsi stepi gerçekleşir
         */
        souce().then((successMessage) => {
            service().then((successMessage) => {
                console.log("Bye!");//servis bitti
            });
        });

    }).catch(function (err) {
        // log that I have an error, return the entire array;
        console.log('A promise failed to resolve', err);

    });
}

function start_process(request_open, request_offer, request_cook_level) {

    isShopOpen = request_open;
    offer = request_offer;
    cook_level = request_cook_level;

    order().then(
        (successMessage) => {
            /**
             * sipariş alındığpı için stok sorgulama çalışır.
             */
            console.log(successMessage);
            checkStock().then(
                (successMessage) => {
                    /**
                     * yeteri kadar stok var ise stok sonrası çalışır.
                     */

                    afterStock();
                },
                (errorMessage) => {

                    /**
                     * stok yok,Eğer stokta malzeme eksiği varsa uyarı mesajı verilmeli, işlem iptal edilmeli, yeni istek alınmamalı
                     */

                    alert(errorMessage);
                    alert('Sipariş İptal Edildi');
                    console.log(errorMessage);
                }
            );
        },
        (errorMessage) => {

            /**
             * isShopOpen = false Order fonksiyonun reject dönme durumu dükkan kapalıysa gerçekleşebilir.
             */

            alert(errorMessage);

        },
    );
}

/**
 * Meal Examples:::
 */
start_process(true, 'meat', 3);
// start_process(true, 'chicken');

