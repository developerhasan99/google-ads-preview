//Declare the App's main module
var adPreviewToolApp = angular.module("adPreviewToolApp", [
	"ui.bootstrap",
	"ngSanitize",
	"dndLists",
]);

function MainController($scope, $http, $window) {
	$scope.refData = {
		availableStructuredSnippetHeaders: [
			{
				optionID: "Amenities",
				optionName: "Amenities",
				displayName: "Amenities",
			},
			{ optionID: "Brands", optionName: "Brands", displayName: "Brands" },
			{ optionID: "Courses", optionName: "Courses", displayName: "Courses" },
			{
				optionID: "Degree-programs",
				optionName: "Degree programs",
				displayName: "Degree programs",
			},
			{
				optionID: "Destinations",
				optionName: "Destinations",
				displayName: "Destinations",
			},
			{
				optionID: "Featured-hotels",
				optionName: "Featured hotels",
				displayName: "Featured hotels",
			},
			{
				optionID: "Insurance-coverage",
				optionName: "Insurance coverage",
				displayName: "Insurance coverage",
			},
			{ optionID: "Models", optionName: "Models", displayName: "Models" },
			{
				optionID: "Neighborhoods",
				optionName: "Neighborhoods",
				displayName: "Neighborhoods",
			},
			{
				optionID: "Service-catalog",
				optionName: "Service catalog",
				displayName: "Services",
			},
			{ optionID: "Shows", optionName: "Shows", displayName: "Shows" },
			{ optionID: "Styles", optionName: "Styles", displayName: "Styles" },
			{ optionID: "Types", optionName: "Types", displayName: "Types" },
		],
		tooltipData: {
			msgExt:
				'Get more customers via text messages. Check "Track Message Conversions" link under "Product" in the footer.',
		},
		availableCurrencies: [
			{ code: "USD", symbol: "&#36;" },
			{ code: "GBP", symbol: "&pound" },
			{ code: "EUR", symbol: "&euro;" },
			{ code: "INR", symbol: "&#8377;" },
			{ code: "JPY", symbol: "&yen;" },
		],
		availablePriceQualifiers: [
			{ name: "From", displayStr: "From" },
			{ name: "Up to", displayStr: "Up to" },
			{ name: "Average", displayStr: "Avg" },
		],
	};
	$scope.features = {
		showRating: false,
		showSitelinkExt: false,
		showSitelinkDescription: false,
		showCallExt: false,
		showMessageExt: false,
		showCalloutExt: false,
		showReviewExt: false,
		showStructuredSnippetsExt: false,
		showPriceExt: false,
	};

	$scope.defaultReviewExtFormat = "Paraphrased";

	$scope.adwordsLimits = {
		headline: 30,
		path: 15,
		displayURL: 35,
		description: 90,
		phone: 15,
		address: 35,
		callout: 25,
		sitelink: 25,
		reviewExt: 67,
		ssValue: 25,
		priceExtTxt: 25,
		messageExtText: 35,
		sitelinkDescLine1: 35,
		sitelinkDescLine2: 35,

		maxHeadlines: 15,
		maxHeadlinesToShow: 3,
		maxDescriptions: 5,
		maxDescriptionsToShow: 2,
	};

	$scope.sampleAd = {
		adType: "RSA",
		version: 1,
		finalurl: "http://www.responsivesearchads.com/top-features",
		headlines: {
			headlineArr: [
				{ text: "Excited About Responsive Ads?", pinnedPosition: 0 },
				{ text: "Get Started With Preview Tool", pinnedPosition: 0 },
				{ text: "Free Tool By Karooya", pinnedPosition: 0 },
			],
		},
		descriptions: {
			descriptionArr: [
				{
					text: "Start Building Awesome Ads. Impress Your Boss and Clients with Screenshots of Great Ads.",
				},
				{
					text: "3 Headlines. 2 Descriptions of 90 Characters. Highlight Features of Your Service/Product.",
				},
			],
		},
		path1: "3-Headlines",
		path2: "2-Descriptions",
		phone: "8001234567",
		callout1: "Additional Text for Ad",
		callout2: "Product/Service Details",
		callout3: "Highlight Offers",
		callout4: "Show Additional Benefits",
		sitelink1: "Show 2 Headlines",
		sitelink2: "30-Character Headline",
		sitelink3: "80 Character Description",
		sitelink4: "Automatic Domain Name",
		reviewExtFormat: $scope.defaultReviewExtFormat,
		reviewText: "A+ Accredited Business",
		reviewSource: "Better Business Bureau",
		//structuredSnippetHeader: $scope.refData.availableStructuredSnippetHeaders[9],
		ssValue1: "",
		ssValue2: "",
		ssValue3: "",
		messageExtText: "Got Questions? Send Us a Text!",
		sitelinkDesc1: {
			line1: "Sitelink1 description first line",
			line2: "Sitelink1 description second line",
		},
		sitelinkDesc2: {
			line1: "Sitelink2 description first line",
			line2: "Sitelink2 description second line",
		},
		sitelinkDesc3: {
			line1: "Sitelink3 description first line",
			line2: "Sitelink3 description second line",
		},
		sitelinkDesc4: {
			line1: "Sitelink4 description first line",
			line2: "Sitelink4 description second line",
		},
		priceExt: {
			currency: $scope.refData.availableCurrencies[0],
			priceQualifier: undefined,
			item1: {
				header: "Header 1",
				description: "Description 1",
				price: 10,
			},
			item2: {
				header: "Header 2",
				description: "Description 2",
				price: 20,
			},
			item3: {
				header: "Header 3",
				description: "Description 3",
				price: 30,
			},
			item4: {
				header: "Header 4",
				description: "Description 4",
				price: 40,
			},
		},
		addresses: [
			{ addressText: "901 Cherry Avenue San Bruno, CA 94066, United States." },
		],
	};

	$scope.ad = $scope.sampleAd;

	$scope.convertEtaAdToRsa = function (ad) {
		ad.adType = $scope.sampleAd.adType;
		ad.version = $scope.sampleAd.version;
		ad.headlines = new Object();
		ad.headlines.headlineArr = new Array();
		ad.descriptions = new Object();
		ad.descriptions.descriptionArr = new Array();
		if (!ad.version || ad.version == 1) {
			ad.headlines.headlineArr.push({ text: ad.headline1, pinnedPosition: 0 });
			ad.headlines.headlineArr.push({ text: ad.headline2, pinnedPosition: 0 });
			ad.headlines.headlineArr.push({ text: "", pinnedPosition: 0 });
			ad.descriptions.descriptionArr.push({ text: ad.description });
			ad.descriptions.descriptionArr.push({ text: "" });
		} else if (ad.version == 2) {
			ad.headlines.headlineArr.push({ text: ad.headline1, pinnedPosition: 0 });
			ad.headlines.headlineArr.push({ text: ad.headline2, pinnedPosition: 0 });
			ad.headlines.headlineArr.push({ text: ad.headline3, pinnedPosition: 0 });
			ad.descriptions.descriptionArr.push({ text: ad.description });
			ad.descriptions.descriptionArr.push({ text: ad.description2 });
		}
	};

	if (!$scope.ad.adType || $scope.ad.adType == "ETA") {
		$scope.convertEtaAdToRsa($scope.ad);
	}

	$scope.getDomainName = function (ad) {
		if (!ad.finalurl) {
			return undefined;
		}
		var domain;
		//find & remove protocol (http, ftp, etc.) and get domain
		if (ad.finalurl.indexOf("://") > -1) {
			domain = ad.finalurl.split("/")[2];
		} else {
			domain = ad.finalurl.split("/")[0];
		}

		//find & remove port number
		domain = domain.split(":")[0];
		return domain.toLowerCase();
	};

	$scope.getCleanFinalUrl = function (ad) {
		if (!ad.finalurl) {
			return undefined;
		}
		var res;
		//find & remove protocol (http, ftp, etc.) and get domain
		if (ad.finalurl.indexOf("://") > -1) {
			res = ad.finalurl;
		} else {
			res = "http://" + ad.finalurl;
		}
		return res;
	};

	$scope.getCompleteDisplayURL = function (ad) {
		var displayURL = undefined;
		if ($scope.getDomainName(ad)) {
			displayURL = $scope.getDomainName(ad);
			if (ad.path1) {
				displayURL = displayURL + "/" + ad.path1;
			}
			if (ad.path2) {
				displayURL = displayURL + "/" + ad.path2;
			}
		}
		return displayURL;
	};

	$scope.clearAd = function () {
		$scope.ad = new Object();
		$scope.ad.reviewExtFormat = $scope.defaultReviewExtFormat;
		$scope.ad.adType = $scope.sampleAd.adType;
		$scope.ad.version = $scope.sampleAd.version;
		$scope.ad.headlines = new Object();
		$scope.ad.headlines.headlineArr = new Array();
		$scope.ad.descriptions = new Object();
		$scope.ad.descriptions.descriptionArr = new Array();
		$scope.ad.headlines.headlineArr.push({ text: "", pinnedPosition: 0 });
		$scope.ad.descriptions.descriptionArr.push({ text: "" });
	};

	$scope.getCalloutLine = function (ad) {
		var calloutArr = new Array();
		if (ad.callout1) calloutArr.push(ad.callout1);
		if (ad.callout2) calloutArr.push(ad.callout2);
		if (ad.callout3) calloutArr.push(ad.callout3);
		if (ad.callout4) calloutArr.push(ad.callout4);
		if (calloutArr.length > 0) {
			return calloutArr.join(" · ");
		}
		return undefined;
	};

	$scope.getSitelinkArr = function (ad) {
		var sitelinkArr = new Array();
		if (ad.sitelink1) sitelinkArr.push(ad.sitelink1);
		if (ad.sitelink2) sitelinkArr.push(ad.sitelink2);
		if (ad.sitelink3) sitelinkArr.push(ad.sitelink3);
		if (ad.sitelink4) sitelinkArr.push(ad.sitelink4);
		return sitelinkArr;
	};

	$scope.hasSitelinks = function (ad) {
		var sitelinkArr = $scope.getSitelinkArr(ad);
		return sitelinkArr.length > 0;
	};

	$scope.hasSitelink = function (ad, index) {
		var sitelinkArr = $scope.getSitelinkArr(ad);
		return sitelinkArr.length >= index;
	};

	$scope.getSitelink = function (ad, index) {
		var sitelinkArr = $scope.getSitelinkArr(ad);
		if (sitelinkArr.length >= index) {
			return sitelinkArr[index - 1];
		}
		return undefined;
	};

	$scope.getPriceExtItemsArr = function (ad) {
		var priceExtItemsArr = new Array();
		if (ad.priceExt) {
			var pe = ad.priceExt;
			if (pe.item1 && pe.item1.header && pe.item1.price && pe.item1.description)
				priceExtItemsArr.push(pe.item1);
			if (pe.item2 && pe.item2.header && pe.item2.price && pe.item2.description)
				priceExtItemsArr.push(pe.item2);
			if (pe.item3 && pe.item3.header && pe.item3.price && pe.item3.description)
				priceExtItemsArr.push(pe.item3);
			if (pe.item4 && pe.item4.header && pe.item4.price && pe.item4.description)
				priceExtItemsArr.push(pe.item4);
		}
		return priceExtItemsArr;
	};

	$scope.hasPriceExtItems = function (ad) {
		var priceExtItemsArr = $scope.getPriceExtItemsArr(ad);
		return priceExtItemsArr.length > 0;
	};

	$scope.hasNonEmptyAddresses = function (ad) {
		var addressArr = $scope.getNonEmptyAddresses(ad);
		return addressArr.length > 0;
	};
	$scope.getNonEmptyAddresses = function (ad) {
		var addressArr = new Array();
		if (ad.addresses) {
			for (var i = 0; i < ad.addresses.length; i++) {
				if (ad.addresses[i].addressText) {
					addressArr.push(ad.addresses[i]);
				}
			}
		}
		return addressArr;
	};
	$scope.getFirstNonEmptyAddress = function (ad) {
		var addressArr = $scope.getNonEmptyAddresses(ad);
		if (addressArr.length > 0) {
			return addressArr[0];
		}
		return undefined;
	};
	$scope.getAddressesToEdit = function (ad) {
		if (!ad.addresses) {
			ad.addresses = new Array();
		}
		if (ad.addresses.length == 0) {
			ad.addresses.push({ addressText: "" });
		}
		return ad.addresses;
	};
	$scope.addNewAddress = function (ad) {
		ad.addresses.push({ addressText: "" });
	};

	$scope.addNewHeadline = function (ad) {
		if (ad.headlines.headlineArr.length < $scope.adwordsLimits.maxHeadlines) {
			ad.headlines.headlineArr.push({ text: "", pinnedPosition: 0 });
		}
	};

	$scope.getHeadlinesToDisplay = function (ad) {
		var headlineArr = new Array();
		for (var i = 0; i < ad.headlines.headlineArr.length; i++) {
			if (ad.headlines.headlineArr[i].text) {
				headlineArr.push(ad.headlines.headlineArr[i]);
				if (headlineArr.length >= $scope.adwordsLimits.maxHeadlinesToShow) {
					break;
				}
			}
		}
		return headlineArr;
	};

	$scope.getDescriptionsToEdit = function (ad) {
		return ad.descriptions.descriptionArr;
	};

	$scope.addNewDescription = function (ad) {
		if (
			ad.descriptions.descriptionArr.length <
			$scope.adwordsLimits.maxDescriptions
		) {
			ad.descriptions.descriptionArr.push({ text: "" });
		}
	};

	$scope.getDescriptionsToDisplay = function (ad) {
		var descriptionArr = new Array();
		for (var i = 0; i < ad.descriptions.descriptionArr.length; i++) {
			if (ad.descriptions.descriptionArr[i].text) {
				descriptionArr.push(ad.descriptions.descriptionArr[i]);
				if (
					descriptionArr.length >= $scope.adwordsLimits.maxDescriptionsToShow
				) {
					break;
				}
			}
		}
		return descriptionArr;
	};

	$scope.getReviewExtLength = function (ad) {
		var len = 0;
		if (ad.reviewText) {
			len += ad.reviewText.length;
		}
		if (ad.reviewSource) {
			len += ad.reviewSource.length;
		}
		return len;
	};

	$scope.getStructuredSnippetLine = function (ad) {
		var res = undefined;
		if (ad.structuredSnippetHeader) {
			var ssValues = $scope.getConcatSSValues(ad);
			if (ssValues) {
				res = ad.structuredSnippetHeader.displayName + ": " + ssValues;
			}
		}
		return res;
	};

	$scope.getConcatSSValues = function (ad) {
		var valueArr = new Array();
		if (ad.ssValue1) valueArr.push(ad.ssValue1);
		if (ad.ssValue2) valueArr.push(ad.ssValue2);
		if (ad.ssValue3) valueArr.push(ad.ssValue3);
		if (valueArr.length > 0) {
			return valueArr.join(", ");
		}
		return undefined;
	};

	$scope.saveAdCreative = function (ad) {
		$http
			.post("/service/free/adPreviewTool/saveNewAdCreative", ad)
			.success(function (data, status, headers, config) {
				if (data == "ERROR") {
					$scope.errorSavingAd =
						"Error occured while saving your ad creative. Please contact support@karooya.com";
				} else {
					$scope.urlToShare = data;
				}
			})
			.error(function (data, status, headers, config) {
				$scope.errorSavingAd =
					"Error occured while saving your ad creative. Please contact support@karooya.com";
			});
	};
}
