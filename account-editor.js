function doPost(event) {

    var lss = SpreadsheetApp.getActiveSpreadsheet();
    var ls = lss.getSheetByName('Account Data'); 
    var data = JSON.parse(event.postData.contents);
    var id = data[0].boxId.toString();
    var textFinder = ls.createTextFinder(id);
  
    var cleanAndSetRequest = function(dataExample){
      var notes = dataExample[0].notes.toString();
      var name = dataExample[0].name.toString();
      var state; 
      if (dataExample[0].fields["1004"]){
        state = dataExample[0].fields["1004"].toString();
       } else {
        state = ""
       }
      var id = "'" + dataExample[0].boxId.toString();
      var dateCreatedTimestamp = dataExample[0].creationTimestamp;
      var rawDate = new Date(dateCreatedTimestamp);
      var dateCreated = Utilities.formatDate(rawDate, "GMT-5", "MM/dd/yyyy");
      var assignedTo = dataExample[0].assignedToSharingEntries[0].email.toString();
      var partnerType; 
      if (dataExample[0].fields["1001"]){
        partnerType = dataExample[0].fields["1001"].toString();
      } else {
        partnerType = ""
      }
      var activityTypeRaw;
      if(dataExample[0].fields["1021"]){
        activityTypeRaw = dataExample[0].fields["1021"].toString().split(",");
      } else {
        activityTypeRaw = ""
      }
      var activityType = [];
      if (activityTypeRaw !== ""){
        activityTypeRaw.forEach(function(element){
          switch(element){
            case "9070":
              activityType.push("Mud Run");
              break;
            case "9004":
              activityType.push("Mountian Biking");
              break;
            case "9002":
              activityType.push("Triathlon");
              break;
            case "9003":
              activityType.push("Running");
              break;
            case "9030":
              activityType.push("Multi-sport");
              break;
            case "9028":
              activityType.push("Surfing");
              break;
            default:
              activityType;
          }})} else {
          activityType = ""
        }
      var activityTypeString;
      if (activityType !== ""){
        activityTypeString = activityType.join(" / ");
      } else {
        activityTypeString = "";
      }
      
      var stage = dataExample[0].stageKey.toString();
       switch(stage){
        case "5001":
          stage = "Leads";
          break;
        case "5002":
          stage = "Initial Contact";
          break;
        case "5012":
          stage = "In Conversation";
          break;
        case "5010":
          stage = "Negotiating Terms";
          break;
        case "5006":
          stage = "MOU";
          break;
        case "5017":
          stage = "Handed Off";
          break;
         default:
           stage;
      }
      
      var quality;
      if (dataExample[0].fields["1013"]){
        quality = "'" + dataExample[0].fields["1013"];
      } else {
        quality = ""
      }
      switch(quality){
        case "'9001":
          quality = 1;
          break;
        case "'9002":
          quality = 2;
          break;
        case "'9003":
          quality = 3;
          break;
        default:
          quality;
      }
      
      var city;
      if (dataExample[0].fields["1005"]){
        city = dataExample[0].fields["1005"].toString();
      } else {
        city = ""
      }
      
      var url;
      if (dataExample[0].fields["1012"]){
        url = dataExample[0].fields["1012"].toString();
      } else {
        url = ""
      }
      
      var platform;
      if (dataExample[0].fields["1009"]){
        platform = dataExample[0].fields["1009"].toString();
      } else {
        platform = ""
      }
      
      var source;
      if (dataExample[0].fields["1006"]){
        source = dataExample[0].fields["1006"].toString();
      } else {
        source = ""
      }
      switch(source){
        case "9004":
          source = "Cold websearch";
          break;
        default:
          source;
      }
      
      var estIntgReach;
      if (dataExample[0].fields["1008"]){
        estIntgReach = dataExample[0].fields["1008"].toString();
      } else {
        estIntgReach = 0
      }
      
      var estIntgCart;
      if (dataExample[0].fields["1029"]){
        estIntgCart = dataExample[0].fields["1029"].toString();
      } else {
        estIntgCart = 0
      }
      
      var estIntgPremPotential = dataExample[0].fields["1034"].calculationValue;
      var estIntgPrem = dataExample[0].fields["1030"].calculationValue;
     
      
      var estBunReach;
      if (dataExample[0].fields["1023"]){
        estBunReach = dataExample[0].fields["1023"].toString();
      } else {
        estBunReach = 0
      }
  
      var estBunCart;
      if (dataExample[0].fields["1028"]){
        estBunCart = dataExample[0].fields["1028"].toString();
      } else {
        estBunCart = 0
      }
      var estBunPremPotential = dataExample[0].fields["1035"].calculationValue;
      var estBunPrem = dataExample[0].fields["1031"].calculationValue;
     
      var estSocialReach;
      if (dataExample[0].fields["1018"]){
        estSocialReach = dataExample[0].fields["1018"].toString();
      } else {
        estSocialReach = 0
      }
      
      var estMemberReach;
      if (dataExample[0].fields["1025"]){
        estMemberReach = dataExample[0].fields["1025"].toString();
      } else {
        estMemberReach = 0
      }
      
      var estSiteReach;
      if (dataExample[0].fields["1026"]){
        estSiteReach = dataExample[0].fields["1026"].toString();
      } else {
        estSiteReach = 0
      }
      
        var estNewsReach;
      if (dataExample[0].fields["1024"]){
        estNewsReach = dataExample[0].fields["1024"].toString();
      } else {
        estNewsReach = 0
      }
      
      var estCoMrktReach = dataExample[0].fields["1027"].calculationValue;
   
      var estCoMrktCart;
      if (dataExample[0].fields["1014"]){
        estCoMrktCart = dataExample[0].fields["1014"].toString();
      } else {
        estCoMrktCart = 0
      }
      var estCoMrktPremPotential = dataExample[0].fields["1036"].calculationValue;
      var estCoMrktPrem = dataExample[0].fields["1015"].calculationValue;
      
      var totalPremPotential = dataExample[0].fields["1037"].calculationValue;
      var expectedPrem = dataExample[0].fields["1032"].calculationValue;
      var expectedRevenue = dataExample[0].fields["1033"].calculationValue;
      
      var sellingMethodRaw;
      if(dataExample[0].fields["1016"]){
        sellingMethodRaw = dataExample[0].fields["1016"].toString().split(",");
      } else {
        sellingMethodRaw = ""
      }
      var sellingMethod = [];
      if (sellingMethodRaw !== ""){
        sellingMethodRaw.forEach(function(element){
          switch(element){
            case "9005":
              sellingMethod.push("Co-marketing");
              break;
            case "9004":
              sellingMethod.push("Bundle");
              break;
            case "9003":
              sellingMethod.push("API Integration");
              break;
            case "9006":
              sellingMethod.push("In-path offering");
              break;
            default:
              sellingMethod;
          }})} else {
          sellingMethod = ""
        }
      var sellingMethodString;
      if (sellingMethod !== ""){
        sellingMethodString = sellingMethod.join(" / ");
      } else {
        sellingMethodString = "";
      }
      
      var mrktPropertiesRaw;
      if(dataExample[0].fields["1011"]){
        mrktPropertiesRaw = dataExample[0].fields["1011"].toString().split(",");
      } else {
        mrktPropertiesRaw = ""
      }
      var mrktProperties = [];
      if (mrktPropertiesRaw !== ""){
        mrktPropertiesRaw.forEach(function(element){
          switch(element){
            case "9008":
              mrktProperties.push("Twitter");
              break;
            case "9009":
              mrktProperties.push("Instagram");
              break;
            case "9003":
              mrktProperties.push("Facebook");
              break;
            default:
              mrktProperties;
          }})} else {
          sellingMethod = ""
        }
      var mrktPropertiesString;
      if (mrktProperties !== ""){
        mrktPropertiesString = mrktProperties.join(" / ");
      } else {
        mrktPropertiesString = "";
      }
      
      var totalEstReach = dataExample[0].fields["1039"].calculationValue;
      
      return [name, state, assignedTo, partnerType, activityTypeString, stage, quality, city, url, 
        platform, source, notes, estIntgReach, estIntgCart,estIntgPremPotential, estIntgPrem, estBunReach, 
        estBunCart,estBunPremPotential, estBunPrem, estSocialReach, estMemberReach, estSiteReach, estNewsReach, 
        estCoMrktReach, estCoMrktCart, estCoMrktPremPotential, estCoMrktPrem, totalPremPotential, expectedPrem, 
        expectedRevenue, sellingMethodString, mrktPropertiesString, totalEstReach, dateCreated, id];
  
    }
    
    try {
      var boxRow = textFinder.findNext().getRow();
      var range = ls.getRange("A" + boxRow + ":AJ" + boxRow);   
      range.setValues([cleanAndSetRequest(data)]);   
    } catch(error){
      ls.appendRow(cleanAndSetRequest(data));
      console.log(error);
    }
  }
  