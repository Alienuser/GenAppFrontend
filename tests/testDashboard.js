/*******************************************************************************
 * GenAppFrontend
 * Copyright (C) 2017 Lars Helmuth Probst - All Rights Reserved.
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * This file is part of the project GenAppFrontend.
 *
 * @version 1.0.1 Release
 * @author Lars Helmuth Probst (Alienuser)
 * @copyright 2017 Lars Helmuth Probst
 * @link http://www.Lars-Probst.de
 ******************************************************************************/

casper.test.begin('Test the Dashboard', 1, function suite(test) {

    casper.start("https://genappfrontend.mybluemix.net/#!/", function () {
        test.assertTitle("GenApp Frontend");
    });

    casper.run(function () {
        test.done();
    });

});