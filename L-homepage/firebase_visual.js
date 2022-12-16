firebase.initialize({
                projectName: 'airline1'
            });
//Store database in variable
var database = firebase.database();
//Get project name
var projectName = database.ref().projectName;
//Post project name on webpage
var dataNodes;

$("#access-firebase").click(function(){
    $("#title").text(projectName);
    refresh();
});

/*This function checks the firebase project for data
and passes the data to another function getData */
function refresh()
{
    database.ref().on("value", function(data){
        dataNodes = data;
        getData(dataNodes);
    })
}

/*This function reads the data from firebase project and
iterates through each item to create a list item for each.

At the top level, iterate through all of the children elements.
if any of them are objects, iterate through the object using 
the addNodes function. Then, append the entire database to webpage
*/
function getData(dataNodes)
{
    $("#firebase-tree").empty();
    var dataArray = Object.entries(dataNodes);
    for(var i = 0; i < dataArray.length; i++)
    {
        var node = dataArray[i]
        var nodeAsHTML = "";
        nodeAsHTML += "<li><b>" + node[0] + "</b></li>";
        if(typeof(node[1]) === "object")
        {
            for(var children = 1; children < node.length; children++)
            {
                nodeAsHTML += "<ul>";
                for(var key in node[children])
                {
                    if(typeof(node[children][key]) === "object")
                    {
                        nodeAsHTML += "<li><b>" + key + "</b>: " + addNodes(node[children][key]);
                    }
                    else
                    {
                        nodeAsHTML += "<li><b>" + key + "</b>: " + node[children][key] +"</li>";
                    }
                }
            }
            nodeAsHTML += "</ul>";
        }
        else
        {
            nodeAsHTML = "<li><b>" + node[0] + "</b>: " + node[1] + "</li>";
        }
        $("#firebase-tree").append(nodeAsHTML);
    }
}

/*If a child node is an object, iterate through all elements in the object
searching to see if any children of children are objects. If so, call 
addNodes. addNodes is recursive */
function addNodes(childNode)
{
    var stringToAdd = "<ul>";
    for(var key in childNode)
    {
        if(typeof(childNode[key]) === "object")
        {
            stringToAdd += "<li>" + key + ": " + addNodes(childNode[key]);
        }
        else
        {
            stringToAdd += "<li>" + key + ":" + childNode[key] +"</li>";
        }
    }
    return stringToAdd + "</ul>";
}