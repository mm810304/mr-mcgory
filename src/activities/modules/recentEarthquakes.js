export const RecentEarthquakes = {
  visual() {
    const allSigQuakesThirtyDays = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson';
    const allQuakesSevenDays = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson';
    const allQuakesToday = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_day.geojson';

    const width = 1000;
    const height = 480;

    const svg = d3.select('.viz__element')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .call(responsivefy);

    let modal = d3.select('body').append('div')
      .attr('class', 'earthquake-modal')
      .style('opacity', 0);

    const projection = d3.geoEquirectangular();

    const path = d3.geoPath().projection(projection);

    //Render Map and Data to Screen
    const render = function(apiUrl = allSigQuakesThirtyDays) {
      d3.json("./../data/world-110m.json").then(world => {
        const countries = topojson.feature(world, world.objects.countries);      

        svg.append("g")
          .selectAll("path")
          .data(topojson.feature(world, world.objects.countries).features)
          .enter().append("path")
          .attr("d", path)
          .attr('fill', 'lightgray')
          .attr('stroke', 'black')
          .attr('stroke-width', 0.1);
      
        svg.append("path")
          .attr("d", path(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; })))
          .attr('fill', 'lightgray')
          .attr('stroke', 'black')
          .attr('stroke-width', 0.1);;
      
          //Add Circles
          d3.json(apiUrl).then(data => {
            
      
            const circle = svg.selectAll('circle')
              .data(data.features);
      
            const locationData = data.features.map(item => {
              const placeName = item.properties.place
              return {
                longitude: item.geometry.coordinates[0],
                latitude: item.geometry.coordinates[1],
                magnitude: item.properties.mag,
                alert: item.properties.alert,
                placeName: item.properties.place.split(',')[1] || item.properties.place,
                time: item.properties.time,
                tsunami: item.properties.tsunami
              };
            })
            
              //Append enter selection to add new circles
              circle.data(locationData)
              .enter()
              .append('circle')
                .attr('cx', (d, i) => projection([d.longitude, d.latitude])[0])
                .attr('cy', (d, i) => projection([d.longitude, d.latitude])[1])
                .attr('r', (d, i) => {
                  if (d.magnitude > 7) {
                    return d.magnitude * 7;
                  } else if (d.magnitude < 7 && d.magnitude > 6) {
                    return d.magnitude * 6;
                  } else if (d.magnitude < 6 && d.magnitude > 5) {
                    return d.magnitude * 5;
                  } else if (d.magnitude < 5 && d.magnitude > 4) {
                    return d.magnitude * 4;
                  } else if (d.magnitude < 4 && d.magnitude > 3) {
                    return d.magnitude * 3;
                  }
                  else {
                    return d.magnitude * 2;
                  }
                })
                .attr('fill', d => d.alert)
                .attr('opacity', .7)
              .on('mouseover', (d, i, n) => {
                d3.select(n[i])
                .transition()
                .duration(100)
                .style('opacity', 0.9)
                
                modal.transition()
                  .duration(200)
                  .style('opacity', 0.9);
      
                modal.html(`
                  <p><strong>Location:</strong> ${d.placeName}</p>
                  <p><strong>Time:</strong> ${new Date(d.time).toLocaleDateString('en-us')}</p>
                  <p><strong>Magnitude:</strong> ${d.magnitude}</p>
                `)
                .style('left', `${d3.event.pageX}px`)
                .style('top', `${d3.event.pageY - 30}px`)
      
              })
              .on('mouseout', (d, i, n) => {
                d3.select(n[i])
                .transition()
                .duration(100)
                .style('opacity', 1)
      
                modal.transition()
                .duration(500)
                .style('opacity', 0);
              })
              .attr('fill', (d, i) => d.alert);
          });
      });
    };

  function responsivefy(svg) {

      const container = d3.select(svg.node().parentNode),
          width = parseInt(svg.style('width'), 10),
          height = parseInt(svg.style('height'), 10),
          aspect = width / height;
     
      svg.attr('viewBox', `0 0 ${width} ${height}`)
          .attr('preserveAspectRatio', 'xMinYMid')
          .call(resize);
     
      d3.select(window).on(
          'resize.' + container.attr('id'), 
          resize
      );
     
      function resize() {
          const w = parseInt(container.style('width'));
          svg.attr('width', w);
          svg.attr('height', Math.round(w / aspect));
      }
    }

    render();

    //Set up DOM
    const questions = ['1. Have there been any major Earthquakes recently?', '2. Look at all the earthquakes for the last 7 days.  Are there any areas that have many earthquakes?  If yes, why do some areas have many earthquakes?', '3. Do any regions have no or very few earthquakes?  Why do you think that is?', '4. What is the biggest earthquake on the map?  Where did it happen and what is the magnitude?', '5. Search the internet and see if you can find any news about the largest earthquake you see on the map.' ];

    let questionIndex = 0;

    const controls = document.getElementById('controls');
    
    controls.innerHTML = `
      <div class="viz__questions">
        <h2 class="viz__question-text" id="question-text">${questions[0]}</h2>
        <div class="viz__btn-container">
            <button class="viz__btn viz__btn-questions" id="prev-button">Previous</button>
            <button class="viz__btn viz__btn-questions" id="next-button">Next</button>
        </div>
      </div>
        <div class="viz__fetch-controls">
          <p class="viz__controls-directions">Check out earthquake data for:</p>
          <button class="viz__btn viz__btn-controls" id="7-days-data">Last 7 Days</button>
          <button class="viz__btn viz__btn-controls" id="today-data">Last 24 Hours</button>
          <button class="viz__btn viz__btn-controls" id="30-days-sig">30 Days - Major Only</button>
        </div>
      </div>
    `;

    const questionText = document.getElementById('question-text');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');

    const sevenDayDataButton = document.getElementById('7-days-data');
    const oneDayDataButton = document.getElementById('today-data');
    const thirtyDayDataButton = document.getElementById('30-days-sig');


    function getPrevQuestion() {
      questionIndex--;

      if (questionIndex < 0) {
        questionIndex = questions.length - 1;
        questionText.textContent = questions[questionIndex];
      } else {
        questionText.textContent = questions[questionIndex];
      }
    }

    function getNextQuestion() {
      questionIndex++;

      if (questionIndex > questions.length - 1) {
        questionIndex = 0;
        questionText.textContent = questions[questionIndex];
      } else {
        questionText.textContent = questions[questionIndex];
      }
    }

    function getSevenDayData() {
      d3.selectAll("svg > *").remove();
      render(allQuakesSevenDays);
    }

    function getOneDayData() {
      d3.selectAll("svg > *").remove();
      render(allQuakesToday);
    }

    function getThirtyDayData() {
      d3.selectAll("svg > *").remove();
      render(allSigQuakesThirtyDays);
    }

    //Event Listener

    //Changing Questions
    prevButton.addEventListener('click', getPrevQuestion);
    nextButton.addEventListener('click', getNextQuestion);

    sevenDayDataButton.addEventListener('click', getSevenDayData);
    oneDayDataButton.addEventListener('click', getOneDayData);
    thirtyDayDataButton.addEventListener('click', getThirtyDayData);
  }
};

RecentEarthquakes.name = 'recentEarthquakeVisual';




