PredictION, by UW Team SDS &ndash; ECCE App Challenge 2015
==================

**Team members:**

Majuratan (Maju) Sadagopan

Jonathan Van Dusen

Shanqi Zhang

PredictION is a new app allowing governments to engage citizens in visualizing new transit routes, allowing citizens to analyze the routes' impact on travel times and service areas, and to compare new routes with the existing system. Here, the app has been implemented for the Grand River Transit network in the Regional Municipality of Waterloo, with specific attention to the upcoming ION Rapid Transit lines.

The experimental Esri add-in [Add GTFS to a Network Dataset](http://transit.melindamorang.com/overview_AddGTFStoND.html) by Melinda Morang and Patrick Stevens was used extensively to convert the Regional Municipality of Waterloo's GTFS (General Transit Feed Specification) data into a shapefile format and allow for schedule-based routing when we created our route and service-area shapefiles.

**To install this app:** Download the "PredicTOR.zip" file in the root of this repository, and unzip it on the web server of your choice. That's it! All data is stored on the developers' ArcGIS Online account, and through the ArcGIS Web AppBuilder for JavaScript package (also included in the repository), other interested users may implement their own version of the app, and refer to their own shapefiles of routes and service areas if desired.

**NOTE:** *This app, in its current state, only provides simulated results for the ION Rapid Transit network, based on a hypothetical schedule we created ourselves. The app serves to demonstrate how these transit changes could be visualized and demonstrated to the public, and therefore should not currently be relied upon for accurate ION routing. (See "Assumptions" section below.)*


## Limitations and Known Issues:

* Due to technical difficulties with the experimental "Add GTFS to Network Dataset" add-in on our ArcGIS Server, this application does not perform interactive routing or service-area analysis (i.e., where the user clicks the map to input locations for the analysis). Instead, routes and service areas for common travel times and Kitchener&mdash;Waterloo&mdash;Cambridge destinations were generated using the ArcGIS ModelBuilder and Python interfaces, and are displayed here using a modified version of the Web AppBuilder's "Query" widget.
* Transit routes are displayed using straight, "as-the-crow-flies" lines between bus stops. This is a limitation of the routing provided by the experimental Esri "Add GTFS to Network Dataset" add-in.
* The transit times include any waiting time required after leaving at the designated start time. For example, if you select a start time of 9:30, it takes you one minute to walk to the nearest bus stop, and the earliest bus leaves at 9:40, the travel time will start counting at 9:30 instead of 9:39. This will often cause travel times to be inflated by some amount (in this case, nine minutes).


## Assumptions:

To support this app's analysis, we've created a hypothetical schedule for the ION LRT and aBRT, based on [information from Grand River Transit](http://rapidtransit.regionofwaterloo.ca/en/projectinformation/frequentlyaskedquestions.asp?_mid_=26033). This only includes the system's Phase 1 of development (Kitchener—Waterloo LRT + Cambridge aBRT), as there is no similar information posted for Phase 2 (Cambridge LRT). In particular:
* The ION LRT will take 46 minutes to travel between Conestoga Mall and Fairview Park Mall (19 km)
* The ION aBRT will take 33 minutes to travel between Fairview Park Mall and the Ainslie Street Terminal (17 km)
* ION trips will be scheduled every 8 minutes during peak periods, and every 10-15 minutes during off-peak periods
* ION will operate between the hours of 5:00 a.m. and 1:00 a.m.

Therefore, our schedule:
* Calculates stop times based on the average speed between the route's start and end locations
* Assumes peak hours between X:00 and X:00, X:00 and X:00, and X:00 and X:00
* Assumes off-peak hours between X:00 and X:00, X:00 and X:00, and X:00 and X:00

The GTFS data for our hypothetical schedule are available in the "GRT_NewGTFS.zip" folder included in our repository.


## Data sources:

* Points of interest:
    * Kitchener: Contains information licensed under the Open Government Licence – The Corporation of the City of Kitchener
	    * [Arenas](http://app.kitchener.ca/opendata/ds_detail.aspx?dsid=43)
		* [Hospitals](http://app.kitchener.ca/opendata/ds_detail.aspx?dsid=54)
		* [Libraries](http://app.kitchener.ca/opendata/ds_detail.aspx?dsid=55)
		* [Museums](http://app.kitchener.ca/opendata/ds_detail.aspx?dsid=58)
		* [Places of Worship](http://app.kitchener.ca/opendata/ds_detail.aspx?dsid=62)
		* [Points of Interest](http://app.kitchener.ca/opendata/ds_detail.aspx?dsid=65)
		* [Schools - Elementary and Secondary](http://app.kitchener.ca/opendata/ds_detail.aspx?dsid=111)
		* [Schools - Post Secondary Education Facilities](http://app.kitchener.ca/opendata/ds_detail.aspx?dsid=95)
	* Waterloo: Contains information provided by the City of Waterloo under licence
		* [Facilities](http://cityofwaterlooopendata.cloudapp.net/DataBrowser/DownloadShape?container=CityOfWaterlooOpenData&entitySet=Facilities&filter=NOFILTER)
		* [Parks](http://cityofwaterlooopendata.cloudapp.net/DataBrowser/DownloadShape?container=CityOfWaterlooOpenData&entitySet=Parks&filter=NOFILTER)
		* [Places of Worship](http://cityofwaterlooopendata.cloudapp.net/DataBrowser/DownloadShape?container=CityOfWaterlooOpenData&entitySet=PlacesofWorship&filter=NOFILTER)
		* [Points of Interest](http://cityofwaterlooopendata.cloudapp.net/DataBrowser/DownloadShape?container=CityOfWaterlooOpenData&entitySet=PointsofInterest&filter=NOFILTER)
* Road network (used in network analysis layers): [National Road Network - Ontario](http://open.canada.ca/data/en/dataset/c0d1f299-179c-47b2-bcd8-da1ba68a8032), from Government of Canada. Contains information licensed under the [Open Government Licence – Canada](http://open.canada.ca/en/open-government-licence-canada).
* Regional boundary (for clipping the above road network): [Regional Municipality of Waterloo Regional Boundary](http://www.regionofwaterloo.ca/en/regionalGovernment/RegionalBoundary.asp)
* GRT bus network: [Regional Municipality of Waterloo GTFS Data](http://www.regionofwaterloo.ca/en/regionalGovernment/GRT_GTFSdata.asp) (GRT_Merged_GTFS.zip)
* ION routes and stops: from Regional Municipality of Waterloo, via University of Waterloo Geospatial Centre

