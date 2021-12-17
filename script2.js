const date = document.querySelector('.date');
const time = document.querySelector('.time');
const bookBtn = document.querySelector('.book');
const bookingCharts = document.querySelector('.bookingCharts');

let year,month,day,hour,minute,meridian;
const allInformation = [];      //to get the right booked informations/

bookBtn.addEventListener('click',() => {
    bookingCharts.innerHTML = "";
    const userName = document.querySelector('#name').value;
    const phoneNo = document.querySelector('#phoneNo').value;
    const yearMonthDay = date.value.split("-");
    year = yearMonthDay[0];
    month = yearMonthDay[1];
    day = yearMonthDay[2];

    const hourMinute = time.value.split(':');
    hour = hourMinute[0];
    minute = hourMinute[1];
    //checking to generate AM and PM correctly
    if (hour > 12) {
      meridian = 'PM';
      hour -= 12;
    } else if (hour < 12) {
      meridian = 'AM';
      if (hour == 0) {
        hour = 12;
      }
    } else {
      meridian = 'PM';
    }

    const bookingTimeObj = {};

    const facts = [userName,phoneNo,year,month,day,hour,minute,meridian,bookingTimeObj];
    allInformation.push(facts);

    if(userName === "" || phoneNo === "" || month === undefined || minute === undefined ){
      alert("Fill all information please!")
      return
    }   //checking to get all needed user information/

    for (let i = 0; i < allInformation.length; i++) { 
      const currentArray = allInformation[i]; 
      console.log(currentArray)
      if(meridian === "PM"){
        currentArray[5] += 12;
      } //to work cancel function corretly when meridian is PM

      const bookingTime = new Date(currentArray[2],currentArray[3]-1,currentArray[4],currentArray[5],currentArray[6]);
      if(meridian === "PM"){
        currentArray[5] -=12;
      }// to fix adding 12 to hour angin and again

      bookingTimeObj.Time = bookingTime.getTime();

      const currentTime1 = new Date();
      const isDeletedOrNot = currentArray[currentArray.length-1];
      console.log(isDeletedOrNot)
      if(isDeletedOrNot === "deleted") {
        console.log(isDeletedOrNot)
        console.log(currentArray);
        continue;      // -->  not to create a bookchart of a deleted one;
      }else if(bookingTime.getTime() < currentTime1.getTime()){
        currentArray.push("deleted");  // --> to continue this booking!
        alert("You can't make a booking of passed time!");
        return;
      }

      //issue!!!
      // everything is gone when user information is not completed
      //user can create the same booking time

      const container = document.createElement('div');
      container.classList.add("container")
      const bookingChart = `    
      <div class="bookingChart">
          <div class="bookedName info">
              Name: <div class="facts"> ${currentArray[0]} </div>
          </div>
          <div class="bookedPhoneNo info">
              phone number: <div class="facts"> ${currentArray[1]} </div>
          </div>
          <div class="bookedDate info">
              Date: <div class="facts" >${currentArray[4]} . ${currentArray[3]} . ${currentArray[2]}</div>
          </div>
          <div class="bookedTime info">
              Time:  <div class="facts">${currentArray[5]} : ${currentArray[6]} ${currentArray[7]} </div>
          </div>
      </div>`

      // make cancel button outside the template leteral to handle cancel function well/
      const cancelBtn = document.createElement('div');
      cancelBtn.textContent = "cancel";
      cancelBtn.classList.add("cancelBtn","Btn")
      container.innerHTML = bookingChart;
      container.append(cancelBtn);
      cancelBtn.addEventListener("click",() => {
        console.log(bookingTime.getTime());
        const currentTime = new Date();
        currentTime.setMinutes(currentTime.getMinutes() + 1);
        if(currentTime.getTime() > bookingTime.getTime()){
          alert("you have to cancel an appointment one minute in advance!");
        }else{
          alert("you can cancel");
          container.style.display = "none";
          currentArray.push("deleted"); // flag a deleted one ;
        }
      });

      if(currentArray[8].Time < currentTime1.getTime()){
        continue;
      }

      bookingCharts.append(container);
    }
});

//https://jsfiddle.net/g0twy8kL/
//https://sai-myo-myat.github.io/bookingApp/
