let Firebase = require('firebase');
//comment

let beerObject = {
    beerID: 1516476457520,
    weekKegOrdered: '1/19/18',
    beername: 'Kathy Ale',
    distributor: 'Shangy',
    kegQuantity: '',
    kegSize: '50L',
    cost: 95.95,
    price: 3.00,
    serving: '16oz',
    tapstyle: 'German Seasonal Tap',
    style: 'Bock',
    tap: 4,
    beerorder: 2
};

class BeerData {
    constructor(dataSrc) {
        this._dataSrc = dataSrc + '/';
        this._beerRec = {
            weekKegOrdered: '1/19/18',
            beername: 'Bucky Ale',
            distributor: 'Shangy',
            kegQuantity: '',
            kegSize: '50L',
            cost: 95.95,
            price: 3.00,
            serving: '16oz',
            tapstyle: 'German Seasonal Tap',
            style: 'Bock',
            tap: 4,
            beerorder: 2
        }
        this.appDistri = {
            empty: "PICK DISTRIBUTOR",
            "Beer Mart": "Beer Mart",
            "CKW": "CKW",
            "Collusion": "Collusion",
            "Gunpowder Falls": "Gunpowder Falls",
            "Kirchner": "Kirchner",
            "Origlio": "Origlio",
            "Shangy": "Shangy",
            "Stockertown": "Stockertown",
            "St Boniface": "St Boniface",
            "31-Wharton": "31-Wharton",
            "Wacker": "Wacker",
            "Wilsbach": "Wilsbach",
            "Westy": "Westy"
        }

        this.appTaps = {
            empty: "",
            "0": "SELECT A TAP FOR THE BEER",
            "1": "Tap 1 Am Lager",
            "2": "Tap 2 Am Ale",
            "3": "Tap 3 Lite Beer",
            "4": "Tap 4 IPA",
            "5": "Tap 5 IPA",
            "6": "Tap 6 Cider",
            "7": "Tap 7 Seasonal",
            "8": "Tap 8 Seasonal",
            "9": "Tap 9 Sour",
            "10": "Tap 10 Belgian",
            "11": "Tap 11 German Lager",
            "12": "Tap 12 Nitro",
            "13": "Tap 13 German Seasonal",
            "14": "Tap 14 German Seasonal",
            "15": "Tap 15 German Lager",
            "16": "Tap 16 German Pils",
            "17": "Tap 17 German Seasonal",
            "18": "Tap 18 German Seasonal",
            "19": "Tap 19 German Lager",
            "20": "Tap 20 German Weiss",
            "21": "Bottle Offerings",
            "22": "Beer Cellar Aging - Offered Later",
            "23": "Pavilion"
        }

        this.appServingSizes = {
            empty: "PICK SERVING SIZE",
            "16oz": "16 oz",
            "12oz": "12 oz",
            "16.9oz": "16.9 oz"
        }

        this.appKegSizes = {
            empty: "PICK KEG SIZE",
            "1/2bbl": "1/2bbl",
            "1/6bbl": "1/6bbl",
            "1/4bbl": "1/4bbl",
            "20L": "20L",
            "30L": "30L",
            "50L": "50L",
            "Case": "Case"
        }

        this.appTapStyleLst = {
            empty: "PICK Tap Style",
            "Am Lager Tap": "Am Lager Tap",
            "Am Ale Tap": "Am Ale Tap",
            "Lite Beer Tap": "Lite Beer Tap",
            "IPA Tap": "IPA Tap",
            "Cider Tap": "Cider Tap",
            "Seasonal Tap": "Seasonal Tap",
            "Sour Tap": "Sour Tap",
            "Belgian Tap": "Belgian Tap",
            "Nitro Tap": "Nitro Tap",
            "German Lager Tap": "German Lager Tap",
            "German Pils Tap": "German Pils Tap",
            "German Weiss Tap": "German Weiss Tap",
            "German Tap": "German Tap",
            "German Seasonal Tap": "German Seasonal Tap",
            "Bottle Offerings": "Bottle Offerings",
            "Beer Cellar Aging": "Beer Cellar Aging",
        }

        this.appBeerStyles = {
            empty: "PICK Beer Style",
            "German": "German",
            "Craft": "Craft",
            "Bottle": "Bottle"
        }        

        this._todayDate = new Date().toDateString();
    }

    get distri() {
        return this.appDistri;
    }
    get taps() {
        return this.appTaps;
    }
    get servingSizes() {
        return this.appServingSizes;
    }
    get kegSizes() {
        return this.appKegSizes;
    }
    get tapStyleLst() {
        return this.appTapStyleLst;
    }
    get beerStyleLst() {
        return this.appTapStyleLst;
    }    

    get beerRec() {
        return this._beerRec;
    };

    get dataSrc() {
        return this._dataSrc;
    };

    async addBeer(beerRec) {

        beerRec.dateStr = this._todayDate;
        beerRec.beerID = new Date().getTime();
        beerRec.dateRec = new Date().getTime();
        beerRec.beerRecOrder = Number.MAX_SAFE_INTEGER - Date.now();
        beerRec.beerorder = Number(beerRec.beerorder);


        let db = Firebase.database();
        let ref = db.ref(this._dataSrc + beerRec.dateRec);
        //let ref = Firebase.database().ref(this._dataSrc + beerRec.dateRec);
        await ref.set(beerRec);


    }

    async editBeer(beerRec, beerID) {

        beerRec.dateStr = this._todayDate;
        beerRec.beerorder = Number(beerRec.beerorder);

        let db = Firebase.database();
        let ref = db.ref(this._dataSrc).orderByChild("beerID").equalTo(beerID);

        return ref.once("child_added").then(function (snapshot) {
            return snapshot.ref.update(beerRec)
        });

        //await ref.once("child_added", function (snapshot) {
        //    snapshot.ref.update(beerRec)
        //});

    }

    async removeBeer(beerID) {

        let db = Firebase.database();
        let ref = db.ref(this._dataSrc).orderByChild('beerID').equalTo(beerID);
        console.log("BeerLib before ref.once Remove")
        return ref.once("child_added").then(function (snapshot) {
            console.log("BeerLib before Remove")
            return snapshot.ref.remove()
            console.log("BeerLib after Remove")
        });
    }

    getBeers(orderByFld, callback) {

        //initialize Firebase DB
        let db = Firebase.database();
        let ref = db.ref(this._dataSrc).orderByChild(orderByFld);
        ref.on("value", snapshot => {
            // to maintain sort, get posts via forEach
            const beers = [];
            snapshot.forEach(c => {
                beers.push(c.val());
            });
            //console.log(beers); Removed

            callback(beers);
        });
    }

    detachGetBeers(listener){
        let db = Firebase.database();
        let ref = db.ref(this._dataSrc).orderByChild(orderByFld);
        ref.off("value", listener)
    }    

    detachGetLimitedBeers(listener){
        let db = Firebase.database();
        let ref = db.ref(this._dataSrc);
        ref.off("value", listener)
    }

    getLimitedBeers(limitToNum, callback) {

        //initialize Firebase DB
        let db = Firebase.database();
        let ref = db.ref(this._dataSrc).limitToLast(limitToNum);
        return ref.on("value", snapshot => {
            // to maintain sort, get posts via forEach
            const beers = [];
            snapshot.forEach(c => {
                beers.push(c.val());
            });
            //console.log(beers); Removed

            callback(beers);
        });
    }

    getBeersByTap(tap, callback) {

        //initialize Firebase DB
        let db = Firebase.database();
        let ref = db.ref(this._dataSrc).orderByChild("tap").equalTo(tap);
        return ref.once("value", snapshot => {
            // to maintain sort, get posts via forEach
            const beers = [];
            snapshot.forEach(c => {
                beers.push(c.val());
            });
            //console.log(beers); Removed

            callback(beers);
        });
    }

    getABeerRec(beerID, callback) {

        let db = Firebase.database();
        let ref = db.ref(this._dataSrc);
        ref.orderByChild('beerID').equalTo(beerID).once("child_added").then(beerRecord => {
            //console.log(beerRecord.val());
            callback(beerRecord.val());
        });

//        ref.orderByChild('beerID').equalTo(beerID).on("child_added", beerRecord => {
//            //console.log(beerRecord.val());
//            callback(beerRecord.val());
//        });

    }
}

class KickedBeer extends BeerData {
    constructor() {
        super('deadKegs');
    }
}

class LiveBeers extends BeerData {
    constructor() {
        super('beerInv');
    }
}

class ReOrderBeers extends BeerData {
    constructor() {
        super('reOrderBeers');
    }
}

class BeerOrders extends BeerData {
    constructor() {
        super('weeklyOrders'); //super('beerOrders'); Change to better name later
    }
}

class ClubEvents extends BeerData {
    constructor() {
        super('events');
    }
}

//specific 
class LLKBeer {
    constructor(dataSrc, beerObject) {
    }
    //Create Objects, create methods like move data, resort, etc.
    //const BeerOrders = new BeerOrders();
    //const newBeer = new BeerOrders(); test

    async initFirebase(config) {
        if (!Firebase.apps || Firebase.apps.length == 0) {
            Firebase.initializeApp(config);
        }
    }

    get BeerOrders() {
        return BeerOrders;
    }

    get ReOrderBeers() {
        return ReOrderBeers;
    }

    get LiveBeers() {
        return LiveBeers;
    }

    get KickedBeer() {
        return KickedBeer;
    }
    
    get ClubEvents() {
        return ClubEvents;
    }    
}

//const beer = new BeerOrders();

//Add
//beer.addBeer(beerObject);

//Edit
//beerObject.beername = "Honey Ale"
//beer.editBeer(beerObject, beerObject.beerID);

//Remove
//beer.removeBeer(beerObject.beerID);

//Get rec
//let locBeerRec = beer.getABeerRec(1516476457520);
//console.log(locBeerRec);
//console.log(locBeerRec.beername);

//Get Recs
//beer.getBeers('beername', (beers) => {
//    console.log(beers);
//});


//process.exit(0);

export default new LLKBeer();