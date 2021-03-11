// ----------------------------------------------------------------------------
// Copyright (c) 2017, Hexagon US Federal, Inc.
// http://hexagonusfederal.com
//
// This SOFTWARE PRODUCT is "commercial computer software" as defined in
// DFARS 252.227-7014 (Rights in Noncommercial Computer Software) and FAR 12.212
// (Computer Software), which includes "technical data" as defined in
// DFARS 252.227-7015 (Technical Data) and FAR 12.211 (Technical Data). All use,
// modification, reproduction, release, performance, display or disclosure of
// this "commercial computer software" shall be in strict accordance with the
// manufacturer's standard commercial license, which is attached to and
// incorporated into the governing Government contract.
// Hexagon US Federal, Inc. and any applicable third party software
// manufacturer(s) are the manufacturer. This SOFTWARE PRODUCT is unpublished and
// all rights are reserved under the Copyright Laws of the United States.
// ----------------------------------------------------------------------------
//
// RequireConfig.js
// Needed to load HTML template / knockout components
// http://requirejs.org/docs/api.html#config
//

var require = {
    baseUrl: "",
    paths: {
        "file-saver": "./FileSaver",
        "jquery": "./jquery-3.0.0",
},
    shim: {
        "bootstrap": {
            deps: ["jquery"]
        }
    }
}