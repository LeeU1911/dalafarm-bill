'use strict';

module.exports.hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

module.exports.helloWName = (event, context, callback) => {
  var name = event.name;
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello ' + name,
    }),
  };

  callback(null, response);

};

module.exports.submitBill = (event, context, callback) => {
  var billContent = event.billContent;
  const response = {
    statusCode: 200,
    body: {
      status: 'successful',
      bill: billContent
    }
  };

  callback(null, response);

};

module.exports.calculateShippingCost = (event, context, callback) => {
  var billContent = event.billContent;
  const response = {
    statusCode: 200,
    body: {
      status: 'successful',
      shippingCost: calculateShippingCostBasedOnBill(billContent)
    }
  };


    callback(null, response);

};
function calculateShippingCostBasedOnBill(bill) {
    var province = bill.info.province;
    var shippingCost = 0;
    var weight = calculateWeight(bill);
    console.log("Weight is " + weight);
    if (province === "TP HCM") {
        if (weight < 200) {
            shippingCost = 20000;
        }
    } else {
        if (weight < 300) {
            if (groupA(province)) {
                weight <= 300 ? shippingCost = 30000 : (weight <= 500 ? shippingCost = 40000 : (weight <= 1000 ? shippingCost = 50000 : (weight <= 1500 ? shippingCost = 65000 : (weight <= 2000 ? shippingCost = 75000 : shippingCost = addShippingCostAtExceedPrice(weight, 75000)))));
            } else if (groupB(province)) {
                weight <= 300 ? shippingCost = 35000 : (weight <= 500 ? shippingCost = 45000 : (weight <= 1000 ? shippingCost = 55000 : (weight <= 1500 ? shippingCost = 70000 : (weight <= 2000 ? shippingCost = 80000 : shippingCost = addShippingCostAtExceedPrice(weight, 80000)))));
            } else if (groupC(province)) {
                weight <= 300 ? shippingCost = 35000 : (weight <= 500 ? shippingCost = 45000 : (weight <= 1000 ? shippingCost = 55000 : (weight <= 1500 ? shippingCost = 70000 : (weight <= 2000 ? shippingCost = 80000 : shippingCost = addShippingCostAtExceedPrice(weight, 80000)))));
            } else if (groupD(province)) {
                weight <= 300 ? shippingCost = 35000 : (weight <= 500 ? shippingCost = 45000 : (weight <= 1000 ? shippingCost = 60000 : (weight <= 1500 ? shippingCost = 75000 : (weight <= 2000 ? shippingCost = 85000 : shippingCost = addShippingCostAtExceedPrice(weight, 85000)))));
            } else if (groupE(province)) {
                weight <= 300 ? shippingCost = 35000 : (weight <= 500 ? shippingCost = 45000 : (weight <= 1000 ? shippingCost = 60000 : (weight <= 1500 ? shippingCost = 75000 : (weight <= 2000 ? shippingCost = 85000 : shippingCost = addShippingCostAtExceedPrice(weight, 85000)))));
            } else {
                weight <= 300 ? shippingCost = 40000 : (weight <= 500 ? shippingCost = 50000 : (weight <= 1000 ? shippingCost = 65000 : (weight <= 1500 ? shippingCost = 80000 : (weight <= 2000 ? shippingCost = 85000 : shippingCost = addShippingCostAtExceedPrice(weight, 85000)))));
            }
        }
    }
    return shippingCost;

    function groupA(province) {
        return province === "Bình Dương" || province === "Đồng Nai" || province === "Tây Ninh" || province === "Bà Rịa - Vũng Tàu";
    }

    function groupB(province) {
        return province === "Bình Phước" || province === "Gia Lai" || province === "Đắk Lắk" || province === "Đắk Nông" || province === "Kon Tum" || province === "Lâm Đồng";
    }

    function groupC(province) {
        return province === "Cần Thơ" || province === "An Giang"
            || province === "Bạc Liêu" || province === "Bến Tre"
            || province === "Cà Mau" || province === "Đồng Tháp"
            || province === "Kiên Giang" || province === "Hậu Giang"
            || province === "Long An" || province === "Sóc Trăng"
            || province === "Trà Vinh" || province === "Tiền Giang"
            || province === "Vĩnh Long";
    }

    function groupD(province) {
        return province === "Hà Nội" || province === "Bắc Ninh" || province === "Vĩnh Phúc" || province === "Hải Phòng" || province === "Phú Thọ";
    }

    function groupE(province) {
        return province === "Đà Nẵng" || province === "Quảng Nam"
            || province === "Bình Định" || province === "Quảng Ngãi"
            || province === "Phú Yên" || province === "Khánh Hòa"
            || province === "Bình Thuận" || province === "Ninh Thuận"
            || province === "Nghệ An" || province === "Thanh Hóa"
            || province === "Quảng Bình" || province === "Hà Tĩnh"
            || province === "Quảng Trị" || province === "Thừa Thiên Huế";
    }

    function addShippingCostAtExceedPrice(weightInGram, lowerTierShippingCost) {
        if (weightInGram > 2000) {
            var exceedWeight = weightInGram - 2000;
            var nextTierPriceAddition = 10000;
            var shippingCost = lowerTierShippingCost + (Math.ceil(exceedWeight / 500) * nextTierPriceAddition);
            return shippingCost;
        }
        return lowerTierShippingCost;
    }

    function calculateWeight(bill) {
        var weight = 0;
        var products = bill.products;
        for (var property in products) {
            if (products.hasOwnProperty(property)) {
                if (property.substr(property.length - 3, property.length) == "Amt" && products[property] > 0) {
                    weight += 50 * products[property];
                    if (property.indexOf("100") > 0) {
                        weight += 50 * products[property];
                    }
                }
            }
        }
        return weight;
    }
}

