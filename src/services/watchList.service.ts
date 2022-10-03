import imgAapl from './../assets/images/apple.png';
import imgAmzn from './../assets/images/amazon.png';
import imgAmat from './../assets/images/amat.png';
import imgCsco from './../assets/images/cisco.png';
import imgEbay from './../assets/images/ebay.png';
import imgFb from './../assets/images/facebook.png';
import imgGoog from './../assets/images/google.png';
import imgIbm from './../assets/images/ibm.png';
import imgIntc from './../assets/images/intel.png';
import imgMsft from './../assets/images/microsoft.png';
import imgNflx from './../assets/images/netflix.png';
import imgTsla from './../assets/images/tesla.png';

import { Ticker, ITicker } from './watchList';

export class WatchListService {

    private defaultAnnualVolatility = .25;      // Annual volatility 25%
    private defaultAnnualReturn = .10;          // Annual return 12%

    constructor() { }

    getWatchList(): ITicker[] {
        let listToReturn = new Array<Ticker>();

        listToReturn.push(this.getApple());
        listToReturn.push(this.getAmazon());
        listToReturn.push(this.getAppliedMaterials());

        listToReturn.push(this.getCisco());
        listToReturn.push(this.getEbay());
        listToReturn.push(this.getFacebook());

        listToReturn.push(this.getGoogle());
        listToReturn.push(this.getIbm());
        listToReturn.push(this.getIntel());

        listToReturn.push(this.getMicrosoft());
        listToReturn.push(this.getNetFlix());
        listToReturn.push(this.getTesla());

        return listToReturn;
    }

    getApple(): ITicker {
        let valueToReturn = new Ticker('AAPL',
            'APPLE',
            153.28,
            'NASDAQ-GS',
            164.94,
            104.08,
            'ELECTRONIC COMPUTERS',
            '791.73B',
            27950000,
            this.defaultAnnualVolatility,
            this.defaultAnnualReturn,
            imgAapl);
        return valueToReturn;
    }

    getAmazon(): ITicker {
        let valueToReturn = new Ticker('AMZN',
            'AMAZON.COM',
            956.4,
            'NASDAQ-GS',
            1083.31,
            710.10,
            'CATALOG AND MAIL-ORDER',
            '459.72B',
            3463395,
            this.defaultAnnualVolatility,
            this.defaultAnnualReturn,
            imgAmzn);
        return valueToReturn;
    }

    getAppliedMaterials(): ITicker {
        let valueToReturn = new Ticker('AMAT',
            'APPLIED MATERIALS',
            50.62,
            'NASDAQ-GS',
            49.71,
            27.56,
            'SEMICONDUCTORS',
            '53.15BB',
            9986960,
            this.defaultAnnualVolatility,
            -.10,
            imgAmat);
        return valueToReturn;
    }

    getCisco(): ITicker {
        let valueToReturn = new Ticker('CSCO',
            'CISCO SYSTEMS',
            33.35,
            'NASDAQ-GS',
            34.60,
            29.12,
            'COMMS EQPT',
            '165.32B',
            20410000,
            this.defaultAnnualVolatility,
            this.defaultAnnualReturn,
            imgCsco);
        return valueToReturn;
    }

    getEbay(): ITicker {
        let valueToReturn = new Ticker('EBAY',
            'EBAY',
            37.73,
            'NASDAQ-GS',
            38.87,
            27.28,
            'BUSINESS SERVICES',
            '40.78B',
            8170000,
            this.defaultAnnualVolatility,
            this.defaultAnnualReturn,
            imgEbay);
        return valueToReturn;
    }

    getFacebook(): ITicker {
        let valueToReturn = new Ticker('FB',
            'FACEBOOK',
            168.73,
            'NASDAQ-GS',
            175.49,
            113.55,
            'SERVICES',
            '487.32B',
            16501709,
            .50,
            -.30,
            imgFb);
        return valueToReturn;
    }

    getGoogle(): ITicker {
        let valueToReturn = new Ticker('GOOG',
            'GOOGLE',
            949.5,
            'NASDAQ-GS',
            988.25,
            727.54,
            'SERVICES',
            '659.55B',
            1550000,
            this.defaultAnnualVolatility,
            this.defaultAnnualReturn,
            imgGoog);
        return valueToReturn;
    }

    getIbm(): ITicker {
        let valueToReturn = new Ticker('IBM',
            'INTERNATIONAL BUSINESS MACHINES',
            145.66,
            'NYSE',
            182.79,
            139.13,
            'COMPUTER EQUIPMENT',
            '135.75B',
            3970000,
            this.defaultAnnualVolatility,
            this.defaultAnnualReturn,
            imgIbm);
        return valueToReturn;
    }

    getIntel(): ITicker {
        let valueToReturn = new Ticker('INTC',
            'INTEL CORPORATION',
            37.83,
            'NASDAQ-GS',
            38.45,
            33.23,
            'SEMICONDUCTORS',
            '176.4B',
            21899260,
            this.defaultAnnualVolatility,
            this.defaultAnnualReturn,
            imgIntc);
        return valueToReturn;
    }

    getMicrosoft(): ITicker {
        let valueToReturn = new Ticker('MSFT',
            'MICROSOFT CORPORATION',
            73.87,
            'NASDAQ-GS',
            75.97,
            56.31,
            'SOFTWARE',
            '568.81B',
            20940698,
            this.defaultAnnualVolatility * 2,
            this.defaultAnnualReturn,
            imgMsft);
        return valueToReturn;
    }

    getTesla(): ITicker {
        let valueToReturn = new Ticker('TSLA',
            'TESLA',
            339.6,
            'NASDAQ-GS',
            389.61,
            178.19,
            'CAR MANUFACTURER',
            '50.74B',
            6873281,
            this.defaultAnnualVolatility,
            -.22,
            imgTsla);
        return valueToReturn;
    }

    getNetFlix(): ITicker {
        let valueToReturn = new Ticker('NFLX',
            'NETFLIX',
            180.7,
            'NASDAQ-GS',
            191.5,
            96.02,
            'MOVIE RENTAL',
            '77.85B',
            6905321,
            this.defaultAnnualVolatility,
            this.defaultAnnualReturn,
            imgNflx);
        return valueToReturn;
    }
}
