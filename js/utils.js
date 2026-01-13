function get(id)
{
    return document.getElementById(id);
}

function dc(tag)
{
    return document.createElement(tag);
}


function updateCurrentUrl(parameters)
{
    let url = new URL(window.location.href);
    url.search = new URLSearchParams(parameters);
    console.log(url);
    try
    {
        window.history.pushState({ path: url.href }, '', url.href);
    }
    catch(e)
    {
        console.log(e);
    }
    
}