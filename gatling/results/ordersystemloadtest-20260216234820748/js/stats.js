var stats = {
    type: "GROUP",
name: "Global Information",
path: "",
pathFormatted: "group_missing-name-b06d1",
stats: {
    "name": "Global Information",
    "numberOfRequests": {
        "total": "1020",
        "ok": "1020",
        "ko": "0"
    },
    "minResponseTime": {
        "total": "2",
        "ok": "2",
        "ko": "-"
    },
    "maxResponseTime": {
        "total": "10328",
        "ok": "10328",
        "ko": "-"
    },
    "meanResponseTime": {
        "total": "2912",
        "ok": "2912",
        "ko": "-"
    },
    "standardDeviation": {
        "total": "3918",
        "ok": "3918",
        "ko": "-"
    },
    "percentiles1": {
        "total": "34",
        "ok": "34",
        "ko": "-"
    },
    "percentiles2": {
        "total": "6147",
        "ok": "6147",
        "ko": "-"
    },
    "percentiles3": {
        "total": "10182",
        "ok": "10182",
        "ko": "-"
    },
    "percentiles4": {
        "total": "10297",
        "ok": "10297",
        "ko": "-"
    },
    "group1": {
    "name": "t < 800 ms",
    "count": 586,
    "percentage": 57
},
    "group2": {
    "name": "800 ms < t < 1200 ms",
    "count": 14,
    "percentage": 1
},
    "group3": {
    "name": "t > 1200 ms",
    "count": 420,
    "percentage": 41
},
    "group4": {
    "name": "failed",
    "count": 0,
    "percentage": 0
},
    "meanNumberOfRequestsPerSecond": {
        "total": "32.903",
        "ok": "32.903",
        "ko": "-"
    }
},
contents: {
"req_view-home-page-5b451": {
        type: "REQUEST",
        name: "View Home Page",
path: "View Home Page",
pathFormatted: "req_view-home-page-5b451",
stats: {
    "name": "View Home Page",
    "numberOfRequests": {
        "total": "510",
        "ok": "510",
        "ko": "0"
    },
    "minResponseTime": {
        "total": "2",
        "ok": "2",
        "ko": "-"
    },
    "maxResponseTime": {
        "total": "10250",
        "ok": "10250",
        "ko": "-"
    },
    "meanResponseTime": {
        "total": "3018",
        "ok": "3018",
        "ko": "-"
    },
    "standardDeviation": {
        "total": "3204",
        "ok": "3204",
        "ko": "-"
    },
    "percentiles1": {
        "total": "1984",
        "ok": "1984",
        "ko": "-"
    },
    "percentiles2": {
        "total": "5780",
        "ok": "5780",
        "ko": "-"
    },
    "percentiles3": {
        "total": "8704",
        "ok": "8704",
        "ko": "-"
    },
    "percentiles4": {
        "total": "9899",
        "ok": "9899",
        "ko": "-"
    },
    "group1": {
    "name": "t < 800 ms",
    "count": 217,
    "percentage": 43
},
    "group2": {
    "name": "800 ms < t < 1200 ms",
    "count": 14,
    "percentage": 3
},
    "group3": {
    "name": "t > 1200 ms",
    "count": 279,
    "percentage": 55
},
    "group4": {
    "name": "failed",
    "count": 0,
    "percentage": 0
},
    "meanNumberOfRequestsPerSecond": {
        "total": "16.452",
        "ok": "16.452",
        "ko": "-"
    }
}
    },"req_buy-laptop-a785d": {
        type: "REQUEST",
        name: "Buy Laptop",
path: "Buy Laptop",
pathFormatted: "req_buy-laptop-a785d",
stats: {
    "name": "Buy Laptop",
    "numberOfRequests": {
        "total": "510",
        "ok": "510",
        "ko": "0"
    },
    "minResponseTime": {
        "total": "2",
        "ok": "2",
        "ko": "-"
    },
    "maxResponseTime": {
        "total": "10328",
        "ok": "10328",
        "ko": "-"
    },
    "meanResponseTime": {
        "total": "2806",
        "ok": "2806",
        "ko": "-"
    },
    "standardDeviation": {
        "total": "4519",
        "ok": "4519",
        "ko": "-"
    },
    "percentiles1": {
        "total": "14",
        "ok": "14",
        "ko": "-"
    },
    "percentiles2": {
        "total": "9969",
        "ok": "9969",
        "ko": "-"
    },
    "percentiles3": {
        "total": "10254",
        "ok": "10254",
        "ko": "-"
    },
    "percentiles4": {
        "total": "10322",
        "ok": "10322",
        "ko": "-"
    },
    "group1": {
    "name": "t < 800 ms",
    "count": 369,
    "percentage": 72
},
    "group2": {
    "name": "800 ms < t < 1200 ms",
    "count": 0,
    "percentage": 0
},
    "group3": {
    "name": "t > 1200 ms",
    "count": 141,
    "percentage": 28
},
    "group4": {
    "name": "failed",
    "count": 0,
    "percentage": 0
},
    "meanNumberOfRequestsPerSecond": {
        "total": "16.452",
        "ok": "16.452",
        "ko": "-"
    }
}
    }
}

}

function fillStats(stat){
    $("#numberOfRequests").append(stat.numberOfRequests.total);
    $("#numberOfRequestsOK").append(stat.numberOfRequests.ok);
    $("#numberOfRequestsKO").append(stat.numberOfRequests.ko);

    $("#minResponseTime").append(stat.minResponseTime.total);
    $("#minResponseTimeOK").append(stat.minResponseTime.ok);
    $("#minResponseTimeKO").append(stat.minResponseTime.ko);

    $("#maxResponseTime").append(stat.maxResponseTime.total);
    $("#maxResponseTimeOK").append(stat.maxResponseTime.ok);
    $("#maxResponseTimeKO").append(stat.maxResponseTime.ko);

    $("#meanResponseTime").append(stat.meanResponseTime.total);
    $("#meanResponseTimeOK").append(stat.meanResponseTime.ok);
    $("#meanResponseTimeKO").append(stat.meanResponseTime.ko);

    $("#standardDeviation").append(stat.standardDeviation.total);
    $("#standardDeviationOK").append(stat.standardDeviation.ok);
    $("#standardDeviationKO").append(stat.standardDeviation.ko);

    $("#percentiles1").append(stat.percentiles1.total);
    $("#percentiles1OK").append(stat.percentiles1.ok);
    $("#percentiles1KO").append(stat.percentiles1.ko);

    $("#percentiles2").append(stat.percentiles2.total);
    $("#percentiles2OK").append(stat.percentiles2.ok);
    $("#percentiles2KO").append(stat.percentiles2.ko);

    $("#percentiles3").append(stat.percentiles3.total);
    $("#percentiles3OK").append(stat.percentiles3.ok);
    $("#percentiles3KO").append(stat.percentiles3.ko);

    $("#percentiles4").append(stat.percentiles4.total);
    $("#percentiles4OK").append(stat.percentiles4.ok);
    $("#percentiles4KO").append(stat.percentiles4.ko);

    $("#meanNumberOfRequestsPerSecond").append(stat.meanNumberOfRequestsPerSecond.total);
    $("#meanNumberOfRequestsPerSecondOK").append(stat.meanNumberOfRequestsPerSecond.ok);
    $("#meanNumberOfRequestsPerSecondKO").append(stat.meanNumberOfRequestsPerSecond.ko);
}
