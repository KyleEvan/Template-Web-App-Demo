
$( document ).ready(function() {

    fetchData();


    /***************************************************************

     Initialize Line Chart on Manager Dashboard

   */
   // Set default data to first user and make li active
   let users = userData[0].data;
   $('.user-list li:first-child').toggleClass('active');

   const ctx = document.getElementById('driversGraph').getContext('2d');
   const graph = new Chart(ctx, {
     type: 'line',
     data: {
       labels: ['12am', '6am', '12pm', '6pm', '12am', '6am', '12pm', '6pm', '12am'],
       datasets:[
         {
           data: users,
           borderColor: '#22BAA0',
           backgroundColor: 'rgba(34, 186, 160, 0.35)'
         }
       ]
     },
     options: {
       responsive: true,
       maintainAspectRatio: false,
       legend: {
         display:false,
         position:'left'
       },
       scales: {
           yAxes: [{
             gridLines:{
               display: false
             },
             ticks: {
               beginAtZero: true,
               stepSize: 1,
               max:10
             }
           }]
       },
       layout: {
         padding: 0
       },
       elements:{
         point:{
           radius:3,
           backgroundColor:'#22BAA0',
           borderWidth:3,
           borderColor:'#22BAA0',
           pointHoverBorderColor:'#22BAA0',
           pointHitRadius: 10,
           hoverRadius:8,
           hoverBorderWidth:5
         },
         line: {
           tension:.1
         }
       }
     }
   });

    // Add event listener to each user li
    $('.user-list').children().click(function(e){
      e.preventDefault();
      const user = $(this).index();
      const el = $(this);
      updateData(el, user, graph);
    });








    /**************************************************************

      Initialize User Sleep Charts

    */


    const ctx3 = document.getElementById('sleepGraph').getContext('2d');
    const sleepGraph = new Chart(ctx3, {
      type: 'doughnut',
      data: {
        labels: ['Night', 'Sleep', 'Day'],
        datasets:[
          {
            label: 'Hours',
            backgroundColor: ['#7a6fbe', '#12AFCB', '#f2ca4c'],
            data: [3,9,12]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        legend:{
          position:'bottom'
        },
        layout: {
          padding: 15
        },
        rotation:1 * Math.PI,
        animation: {
          animateScale:true
        },
        circumference: 1.8*Math.PI
      }
    });



    /*********************************************

      Initialize Slider

    */
    $('#viewContainer').slick({
      speed: 200,
      infinite: false,
      slidesToShow: 1
      // adaptiveHeight: true
    });

    // Side nav tabs
    $('.nav').on('shown.bs.tab', function(e){
      $('.accordion-menu li').removeClass('active');
      $(this).parent().toggleClass('active');
      $('#viewContainer').slick('setPosition');
    });



});




/* Manager Dashboard function for swapping chart data */
function updateData(el, i, chart){
  // Set new active li
  $('.user-list li.active').removeClass('active');
  el.toggleClass('active');

  // Update chart data
  chart.data.datasets[0].data = userData[i].data;
  chart.update();
}

function fetchData(){

  const request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

        const Data = JSON.parse(request.responseText);
        console.log(Data);

        // Today
        const alertnessGraph = Data.user.today.alertnessGraph;
        todayGraph(alertnessGraph);
        const currentAlertness = Data.user.today.currentAlertness;
        const totalSteps = Data.user.today.totalSteps;
        const activeCalories = Data.user.today.activeCalories;
        const totalSleep = Data.user.today.totalSleep;

        // SleepLog/Sleep
        const entries = Data.user.sleepLog.entries;
        const startSleep = entries[0].startSleep;
        const endSleep = entries[0].endSleep;
        const dailyTotal = Data.user.sleepLog.dailyTotal;
        const dailyGoal = Data.user.sleepLog.dailyGoal;
        const timesWokeUp = Data.user.sleepLog.timesWokeUp;
        const awakeFor = Data.user.sleepLog.awakeFor;
        const inMotionFor = Data.user.sleepLog.inMotionFor;

        // populate fields
        document.getElementById('currentAlertness').innerHTML = currentAlertness;
        document.getElementById('totalSteps').innerHTML = totalSteps;
        document.getElementById('activeCalories').innerHTML = activeCalories;
        document.getElementById('totalSleep').innerHTML = totalSleep;
        document.getElementById('startSleep').innerHTML = startSleep;
        document.getElementById('endSleep').innerHTML = endSleep;
        document.getElementById('entryTotalSleep').innerHTML = totalSleep;
        document.getElementById('dailyTotal').innerHTML = dailyTotal;
        document.getElementById('dailyGoal').innerHTML = dailyGoal;
        document.getElementById('timesWokeUp').innerHTML = timesWokeUp;
        document.getElementById('awakeFor').innerHTML = awakeFor;
        document.getElementById('inMotionFor').innerHTML = inMotionFor;

        console.log('user views populated');

      }
    };
    request.open("GET", "http://curaegis.azurewebsites.net/api/watch/5", true);
    request.send();
}


/**********************************************************************

 Initialize User Today Line chart

*/
function todayGraph(graphData){
  const ctx2 = document.getElementById('todayGraph').getContext('2d');
  const todayGraph = new Chart(ctx2, {
    type: 'line',
    data: {
      labels: ['12am', '6am', '12pm', '6pm', '12am', '6am', '12pm', '6pm', '12am'],
      datasets:[
        {
          data: graphData,
          borderColor: '#22BAA0',
          backgroundColor: 'rgba(34, 186, 160, 0.35)'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display:false,
        position:'left'
      },
      scales: {
          yAxes: [{
            gridLines:{
              display: false
            },
            ticks: {
              beginAtZero: true,
              stepSize: 1,
              max:10
            }
          }]
      },
      layout: {
        padding: 0
      },
      elements:{
        point:{
          radius:3,
          backgroundColor:'#22BAA0',
          borderWidth:3,
          borderColor:'#22BAA0',
          pointHoverBorderColor:'#22BAA0',
          pointHitRadius: 10,
          hoverRadius:8,
          hoverBorderWidth:5
        },
        line: {
          tension:.1
        }
      }
    }
  });
}
