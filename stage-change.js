function doPost(event) {

    var lss = SpreadsheetApp.getActiveSpreadsheet();
    var ls = lss.getSheetByName('Stage Changes'); 
    var data = JSON.parse(event.postData.contents);
    
    var cleanAndSetRequest = function(dataExample){
      var id = "'" + dataExample[0].boxId.toString();
      var stageName;
      var stage = dataExample[0].stageKey.toString();
      var callCount = dataExample[0].callLogCount.toString();
      var lastTouchpoint;
      if (dataExample[0].lastTouchpointType){
        lastTouchpoint = dataExample[0].lastTouchpointType.toString();
      } else {
        lastTouchpoint = ""
      }
      var lastCallDateTimestamp = dataExample[0].mostRecentCallLogTimestamp;
      var lastCallDateUnformatted = new Date(lastCallDateTimestamp);
      var lastCallDateIf = Utilities.formatDate(lastCallDateUnformatted, "GMT-5", "MM/dd/yyyy");
      var emailsSent = dataExample[0].totalNumberOfSentEmails.toString();
      var emailsReceived = dataExample[0].totalNumberOfReceivedEmails.toString();
      var lastEmailSentDateTimestamp = dataExample[0].lastEmailSentTimestamp;
      var lastEmailSentDateUnformatted = new Date(lastEmailSentDateTimestamp);
      var lastEmailSentDateIf = Utilities.formatDate(lastEmailSentDateUnformatted, "GMT-5", "MM/dd/yyyy");
      var lastStageChangeTimestamp = dataExample[0].lastStageChangeTimestamp;
      var lastStageChangeTimestampUnformatted = new Date(lastStageChangeTimestamp);
      var lastStageChangeTimestampDate = Utilities.formatDate(lastStageChangeTimestampUnformatted, "GMT-5", "MM/dd/yyyy");
      var lastEmailSentDate;
      var lastCallDate;
      var meetingNoteCount = dataExample[0].meetingNotesCount.toString();
      
      if(lastEmailSentDateTimestamp > 946684800){
        var lastEmailSentDate =  lastEmailSentDateIf;
      } else {
        lastEmailSentDate = ""
      }
      
      if(lastCallDateTimestamp > 946684800){
        var lastCallDate =  lastCallDateIf;
      } else {
        lastCallDate = ""
      }
      
      switch(stage){
        case "5001":
          stageName = "Leads";
          break;
        case "5002":
          stageName = "Initial Contact";
          break;
        case "5012":
          stageName = "In Conversation";
          break;
        case "5010":
          stageName = "Negotiating Terms";
          break;
        case "5006":
          stageName = "MOU Executed";
          break;
        case "5017":
          stageName = "Implemented/ Shipped";
          break;
        case "5016":
          stageName = "Duplicate";
          break;
        case "5008":
          stageName = "Lost";
          break;
        case "5009":
          stageName = "Re-Approach";
          break;
        case "5011":
          stageName = "Unresponsive";
          break;
        case "5013":
          stageName = "Re-Approach Too Small";
          break;
        case "5014":
          stageName = "Re-Approach API";
          break;
        case "5015":
          stageName = "Pass-Unqualified";
          break;
        default:  
          stage;      
      }
      return [id, stageName, lastStageChangeTimestampDate, lastTouchpoint, callCount, lastCallDate, emailsSent, 
        emailsReceived, lastEmailSentDate, meetingNoteCount]; 
   }
    
    
    ls.appendRow(cleanAndSetRequest(data));
  
  }