/**
 * LIVE = 1
 * WANT = 2
 * PLAN = 3
 * VISIT = 4
 **/

/**
 * drawMap() draws the map in the provided divId, using the provided dataSrc.
 * @param divId is a string corresponding to the ID of the <div> we will place 
 * the map in
 * @param dataSrc (optional) is an Object with at least a 'name' and a 'value'
 **/
function drawMap(divId, dataSrc) {
  // If no data source provided, load default set of data.
  if (!dataSrc) {
    dataSrc = loadDefaultData();
  }
  
  // Set up the data for the map.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Country');  // Country visited.
  data.addColumn('number', 'Value');    // Value corresponding to visit status.
  data.addColumn({'type': 'string', 'role': 'tooltip'});

  // Populate the data.
  var keys = Object.keys(dataSrc);
  for (var i = 0 ; i < keys.length; i++) {
    var key = keys[i];
    var entry = dataSrc[key];
    var val = entry['value'];
    if ('plan' in val) {
      var colorIndex = 3;
    } else if ('live' in val) {
      var colorIndex = 1;
    } else if ('visit' in val) {
      var colorIndex = 4;
    } else if ('want' in val) {
      var colorIndex = 2;
    }
    data.addRows([[entry['name'], colorIndex, genTooltip(entry)]]);
  }
  
  // Set options for the map.  See documentation at:
  // https://developers.google.com/chart/interactive/docs/gallery/geochart
  var options = {
    'region': 'world', 
    'resolution': 'countries', 
    'legend': 'none', 
    'colorAxis': {
      'colors': ['#438094', '#78507B', '#6DBD9B', '#79AEC0'],
      'values': [1,2,3,4]
    },
    'tooltip': {
      'trigger': 'focus'
    },
    'width': Math.min(window.innerWidth, 1.6 * window.innerHeight),
    'keepAspectRatio': true,
    'domain': 'IN',
  };
  
  var chart = new google.visualization.GeoChart(document.getElementById('map_div'));
  chart.draw(data, options);
}

/**
 * genTooltip() is a helper function which generates a standard tooltip 
 * for the given entry.
 * @param entry is an Object which holds at least 'name' and 'value'.
 * @return the tooltip string that is generated
 **/
function genTooltip(entry) {
  if ('tooltip' in entry) {
    return entry['tooltip'];
  }

  var elems = [];
  var val = entry['value'];
  if ('plan' in val) {
    elems.push("Upcoming trip in " + val['plan']);
  } else if ('live' in val) {
    if (val['live'] == 'Present') {
      elems.push("Currently living here");
    } else {
      elems.push("Lived " + val['live'])
    }
  } else if ('visit' in val) {
    elems.push("Last visited in " + val['visit'][0]);
    var visitCount = val['visit'].length;
    if (visitCount == 1) {
      var timesString = "time";
    } else {
      var timesString = "times";
    }
    elems.push("(Visited " + visitCount + " " + timesString + ")");
  } else if ('want' in val) {
    elems.push("On the wishlist");
  }

  return elems.join("\n");
}

/**
 * genEntry() is a helper function which creates an Entry object.
 * @param name is the name of the country for the entry
 * @param value is an Object with attributes for travel history
 * @param link (optional) is a link to include
 * @return the generated Entry object
 **/
function genEntry(name, value, link) {
  var entry = { 'name' : name, 'value': value };
  if (link) {
    entry['link'] = link;
  }
  return entry;
}

/**
 * loadDefaultData() is a helper function which also stores all of 
 * the travel history information.
 * @return the data object containing all the details
 **/
function loadDefaultData() {
  var data = {};
  data['Australia'] = genEntry('Australia', {'want': true});
  data['Bahamas'] = genEntry('Bahamas', {'visit': ['Feb 2003']});
  data['Belgium'] = genEntry('Belgium', {'visit': ['Dec 2013']});
  data['Brazil'] = genEntry('Brazil', {'want' : true});
  data['Canada'] = genEntry('Canada', {'visit' : ['June 2008']});
  data['Croatia'] = genEntry('Croatia', {'visit' : ['Mar 2016']});
  data['Egypt'] = genEntry('Egypt', {'want': true});
  data['France'] = genEntry('France', {'visit' : ['May 2016','Aug 2013']});
  data['Germany'] = genEntry('Germany', {'visit' : ['Dec 2013']});
  data['Hong Kong'] = genEntry('Hong Kong', {'visit' : ['Oct 2016', 'Jun 2015', 'May 2015', 'Dec 2012', 'Dec 2011', 'Dec 2009', 'Feb 2009', 'Feb 2008', 'Feb 2006', 'Feb 2004']});
  data['Iceland'] = genEntry('Iceland', {'visit': ['Mar 2017']});
  data['India'] = genEntry('India', {'want': true});
  data['Italy'] = genEntry('Italy', {'visit' : ['June 2012']});
  data['Japan'] = genEntry('Japan', {'visit' : ['Jun 2015']});
  data['Macao'] = genEntry('Macao', {'visit' : ['Feb 2009']});
  data['Netherlands'] = genEntry('The Netherlands', {'visit' : ['Dec 2013']});
  data['New Zealand'] = genEntry('New Zealand', {'visit' : ['Jan 2015']});
  data['Norway'] = genEntry('Norway', {'visit': ['Apr 2016']});
  data['Peru'] = genEntry('Peru', {'want' : true});
  data['Sint Maarten (Dutch part)'] = genEntry('Sint Maarten (Dutch part)', {'visit' : ['Feb 2003']});
  data['Singapore'] = genEntry('Singapore', {'visit': ['Oct 2016']});
  data['South Korea'] = genEntry('South Korea', {'visit': ['Oct 2016']});
  data['Spain'] = genEntry('Spain', {'visit' : ['May 2016']});
  data['Sweden'] = genEntry('Sweden', {'visit': ['Mar 2016']});
  data['Taiwan'] = genEntry('Taiwan', {'visit' : ['Dec 2011']});
  data['Thailand'] = genEntry('Thailand', {'want' : true});
  data['Turkey'] = genEntry('Turkey', {'want': true});
  data['United Kingdom'] = genEntry('United Kingdom', {'live': 'Aug-Dec 2013', 'visit' : ['Mar 2016', 'June 2012'] });
  data['United States'] = genEntry('United States', {'live': 'Present'});
  data['Vatican City'] = genEntry('Vatican City', {'visit': ['Jun 2012']});
  data['Vietnam'] = genEntry('Vietnam', {'visit': ['Oct 2016']});
  data['Virgin Islands, U.S.'] = genEntry('Virgin Islands, U.S.', {'visit' : ['Feb 2003']});
  return data;
}
