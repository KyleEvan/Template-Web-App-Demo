
$( document ).ready(function() {

    // Fetch Data
    // fetchData();
    let data =
    {
      user: {
        today: {
          alertnessGraph: [
            {x:1, y:5},
            {x:2, y:7.6},
            {x:3, y:8.3},
            {x:4, y:4.9},
            {x:5, y:3},
            {x:6, y:3.4},
            {x:7, y:3},
            {x:8, y:3.2},
            {x:9, y:6}
          ],
          currentAlertness: 6,
          totalSteps: 1200,
          activeCalories: 360,
          totalSleep: '9hrs 0min'
        },
        sleepLog: {
          entries: [
            {
              startSleep: '12:00 AM',
              endSleep: '9:00 AM',
              totalSleep: '9hrs 0min'
            }
          ],
          dailyTotal: '9hrs 0min',
          dailyGoal: '8hrs 0min',
          timesWokeUp: 4,
          awakeFor: '20min',
          inMotionFor: '5min'
        }
      }
    };












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





    /**********************************************************************

     Initialize User Today Line chart

    */
    const ctx2 = document.getElementById('todayGraph').getContext('2d');
    const todayGraph = new Chart(ctx2, {
      type: 'line',
      data: {
        labels: ['12am', '6am', '12pm', '6pm', '12am', '6am', '12pm', '6pm', '12am'],
        datasets:[
          {
            data: [{
              x:1,
              y:5
            },{
              x:2,
              y:7.6
            },{
              x:3,
              y:8.3
            },{
              x:4,
              y:4.9
            },{
              x:5,
              y:3
            },{
              x:6,
              y:3.4
            },{
              x:7,
              y:3
            },{
              x:8,
              y:3.2
            },{
              x:9,
              y:6
            }],
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
