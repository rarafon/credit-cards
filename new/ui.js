var ui = {
  pObject: null,
  inputList: ['balance', 'rate', 'months', 'payment'],
  inputData: null,
  inputFormatter(type, value) {
  	// formats value, eg 100.424 to 100.42,
  	// depending on the input 
  	switch(type) {
  	  case 'balance':
  	  case 'payment': 
  	    return decimalConverter(value);
  	  case 'rate':
  	  	if (value >= 1) {
  	  	  return parseFloat(value) / 100; }
  	  default:
  	  	  return parseFloat(value);
  	}
  },
  inputChecker(data) {
    if (testForNumber(data.balance) && testForNumber(data.rate)) {
      if (testForNumber(data.months))
        return true;
      if (testForNumber(data.payment))
        return true;
    }
    return false;
  },
  translateInputData() {
  	function getValueFromEle(elementId) {
  	  return document.getElementById(elementId).value; 
  	}

    var data = {};

  	each(this.inputList, function( input ) {
  	  var value = getValueFromEle(input);
  	  data[input] = this.inputFormatter(input, value);
  	}, this);

    return data;
  },
  submitData(e) {
  	var that = ui;

  	var inputData = that.translateInputData(e);

  	if (that.inputChecker(inputData)) {
      that.inputData = inputData;
      storage.store("inputData", inputData);

      that.pObject = new PaymentObject(inputData);
  	} else {
  	  console.log("ERROR");
    }
  }
};