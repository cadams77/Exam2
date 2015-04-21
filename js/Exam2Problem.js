function MenuChoice()
{
    if (document.getElementById("menu").value == "Category List")
    {
        document.getElementById("section1").style.visibility = "visible";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Create Category")
    {
        document.getElementById("section2").style.visibility = "visible";
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Change Description")
    {
        document.getElementById("section3").style.visibility = "visible";
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Delete Category")
    {
        document.getElementById("section4").style.visibility = "visible";
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "About")
    {
        document.getElementById("section5").style.visibility = "visible";
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
    }
    else
    {
        document.getElementById("section2").style.visibility = "hidden";
        document.getElementById("section1").style.visibility = "hidden";
        document.getElementById("section3").style.visibility = "hidden";
        document.getElementById("section4").style.visibility = "hidden";
        document.getElementById("section5").style.visibility = "hidden";
    }
}




function GetCategories()
{
var objRequest = new XMLHttpRequest(); //Create AJAX request object

//Create URL and Query string
var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getAllCategories";


//Checks that the object has returned data
objRequest.onreadystatechange = function()
{
    
if (objRequest.readyState == 4 && objRequest.status == 200)
{
    
var output = JSON.parse(objRequest.responseText);
GenerateOutput3(output);
}
}

//Initiate the server request
objRequest.open("GET", url, true);
objRequest.send();

}
function GenerateOutput3(result)
{
    
var count = 0;
var displaytext = "<table><tr><th><h4>Category ID</h4></th><th><h4>Category Name</h4></th><th><h4>Category Description</h4></th><th><h4>" + "</td><td>"; //Table header and first row;

//Loop to extract data from the response object
for (count = 0; count < result.GetAllCategoriesResult.length; count++)
{
    
displaytext += "<tr><td>" + result.GetAllCategoriesResult[count].CID + "</td><td>" + result.GetAllCategoriesResult[count].CName + "</td><td>" + result.GetAllCategoriesResult[count].CDescription + "</td></tr>";
}

document.getElementById("displaycategories").innerHTML = displaytext;
}



function AddProduct()
{
    
var objRequest = new XMLHttpRequest();

var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCategory";

//Collect Customer data from web page
var categoryname = document.getElementById("categoryname").value;

var categorydescription = document.getElementById("categorydescription").value;


//Create the parameter string
var newproduct = '{"CName":"' + categoryname + '","CDescription":"' + categorydescription +'"}';


//Checking for AJAx operation return
objRequest.onreadystatechange = function()
{
    
if (objRequest.readyState == 4 && objRequest.status == 200)
{
    
var result = JSON.parse(objRequest.responseText);
OperationResult(result);
}
}

//Start AJAX request
objRequest.open("POST", url, true);

objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

objRequest.send(newproduct);
}


function OperationResult(output)
{
    
if (output.WasSuccessful == 1)
{
    
document.getElementById("result").innerHTML = "The operation was successful!"
}

else
{
    
document.getElementById("result").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
}
}



function UpdateDescription()
{
    
var objRequest = new XMLHttpRequest();

var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/updateCatDescription";

//Collect Customer data from web page
var catid = document.getElementById("catid").value;

var catdescription = document.getElementById("catdescription").value;


//Create the parameter string
var updatedescription = '{"CID":"' + catid + '", "CDescription":"' + catdescription + '"}';


//Checking for AJAx operation return
objRequest.onreadystatechange = function()
{
    
if (objRequest.readyState == 4 && objRequest.status == 200)
{
    
var result = JSON.parse(objRequest.responseText);
ShipResult(result);
}
}

//Start AJAX request
objRequest.open("POST", url, true);

objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

objRequest.send(updatedescription);
}


function ShipResult(output)
{
    
if (output.WasSuccessful == 1)
{
    
document.getElementById("result2").innerHTML = "The operation was successful!"
}

else
{
    
document.getElementById("result2").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
}
}



function DeleteCategory()
{
var objRequest = new XMLHttpRequest(); //Create AJAX request object

//Create URL and Query string
var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCategory/";
url += document.getElementById("catiddelete").value;

//Checks that the object has returned data
objRequest.onreadystatechange = function()
{
    
if (objRequest.readyState == 4 && objRequest.status == 200)
{
    
var output = JSON.parse(objRequest.responseText);
GenerateOutput(output);
}
}

//Initiate the server request
objRequest.open("GET", url, true);
objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
objRequest.send();

}
function GenerateOutput(result)
{
if (result.DeleteCategoryResult.WasSuccessful == 1)
{
    
document.getElementById("result3").innerHTML = "The operation was successful!"
}

else
{
    
document.getElementById("result3").innerHTML = "The operation was not successful!" + "<br>" + result.Exception;
}
}