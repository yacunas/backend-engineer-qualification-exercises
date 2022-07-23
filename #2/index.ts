/**
 * Calculates the ratio between the amount of time when status is AVAILABLE and
 * the amount of time between startDateTime inclusive and endDateTime exclusive.
 * @param startDateTime 
 * @param endDateTime 
 */

const data = require('./data.json'); 

export function availability(startDateTime: Date, endDateTime: Date): number {
  let avail_counter = 0;
  let unavail_counter = 0;
  let start = false;
  
  //Loop for traversing the data.json
  for(var val of data ){

    let val_dt = new Date(val.timestamp);

    if(val_dt.getTime() == startDateTime.getTime() || start == true){
      start = true;
      if(val.status == "AVAILABLE"){
        avail_counter++;
      }
      else{
        unavail_counter++;
      }
      if(val_dt.getTime() == endDateTime.getTime()){
        start = false; //Loop stopping case
      }
    }
  }

  let ratio = avail_counter/(avail_counter+unavail_counter); //Formula for calculating the ratio
  console.log(ratio);
  return ratio;
}

/**
 * Generates the outages between startDateTime inclusive and endDateTime exclusive.
 * An outage is PARTIAL if the status within the period is PARTIALLY_AVAILABLE.
 * Similarly, an outage is MAJOR if the status within the period is MAJOR.
 * @param startDateTime
 * @param endDateTime
 */
export function outages(startDateTime: Date, endDateTime: Date): { type: 'PARTIAL' | 'MAJOR', timestamp: Date, duration: number }[] {

  var types: "PARTIAL" | "MAJOR";
  var prevStatus;
  var nextStatus;

  var start = false;
  var count = 0;
  var count2 = 0;
  var index = 0;
  var duration = 1;

  var finalTimestamps = [];
  var finalTypes = [];
  var finalDurations = [];

  //Loop for getting the type, timestamp and duration within the startDateTime and endDateTime  
  for(var val of data){
    
    var val_dt = new Date(val.timestamp);

    if(start == false){
      prevStatus = val.status; //get the first status 
    }

    if(val_dt.getTime() == startDateTime.getTime() || start == true){
      start = true;
    
      if(val.status != 'AVAILABLE'){
        nextStatus = data[index+1].status;
        if(val.status == nextStatus){
          duration++; //Duration Counter
        }
        else{
          finalDurations[count2] = duration; //Pushing a duration for every status
          duration = 1;
          count2++
        }

        if(prevStatus != val.status || (prevStatus == 'AVAILABLE' && val.status != 'AVAILABLE') ){ //
          if(val.status == 'UNAVAILABLE'){
            finalTypes[count] = 'MAJOR';
          }
          else{
            finalTypes[count] = 'PARTIAL';
          }

          finalTimestamps[count] = val_dt;
          count++;
        }              
      }
      prevStatus = val.status;

      if(val_dt.getTime() == endDateTime.getTime()){
        start = false; //For loop stopping Case
      }
    }
    index++;
  }

  let final = [];

  //Loop for joining all the types, timestamp and durations in a final object
  for(var i = 0; i < count; i++){
    if(finalTypes[i] == "MAJOR"){
      types = "MAJOR"      
    }
    else{
      types = "PARTIAL"
    }
    //Creating a final object to return
    final[i] = {"type": types, "timestamp": finalTimestamps[i],"duration": finalDurations[i]}; 
  }

  return final;
}
