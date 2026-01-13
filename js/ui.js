

function getColor(i)
{
    let colors = [
            "#eb3b5a",
            "#fa8231",
            "#f7b731",
            "#009432",
            "#2d98da",
            "#0652DD",
            "#8e44ad",
            // "#AD5E10",
            // "#7C9294",
            // "#AD7A0D",
    ];
    return colors[i%colors.length];
}


function parseUnlocked(input)
{
    return input.toLowerCase().trim();
}

function parseSets(input)
{
    return input.toLowerCase().trim().split(/\|| |\,|-/g);
}

function encodeText()
{

    params.unlocked       =  parseUnlocked(get("unlocked_letters").value);
    params.sets           = parseSets(get("letter_sets").value);
    params.color_sets     = get("option_color").checked;
    params.order_sets     = get("option_order").checked;


    let input = get("input").value.trim();

    let url_parameters = 
    {
        "i":input,
        "u":params.unlocked,
        "s":params.sets,
        "c":params.color_sets,
        "o":params.order_sets,
    }

    updateCurrentUrl(url_parameters);



    let output_tag = get("output");
    let color_index = 0;

    let output_segments = cypher(input);
    let set_data = [];

    output_tag.innerHTML = "";
    
    for(let segment of output_segments)
    {
        let out = dc("span");
        out.innerHTML = segment.chars.join("");

        if(segment.decorators.underline)
        {
            out.classList.add("underlined");
        }

        if(segment.decorators.sets)
        {
            if(params.color_sets)  out.style.color = getColor(color_index);
            set_data.push(segment.decorators.sets);
            color_index++;
        }

        output_tag.appendChild(out);
    }

    output_tag.appendChild(dc("br"));

    color_index = 0;
    for(sets of set_data)
    {
        let line = dc("span");
        line.classList.add("annotated_set")
        line.innerHTML = `[${sets.join("|")}]`;

        if(params.color_sets) line.style.color = getColor(color_index);

        output_tag.appendChild(line);
        color_index++;
    }


}



function init()
{

    let url_params = new URLSearchParams(window.location.search);
    console.log(url_params)
    if(url_params.get("i"))
    {
        get("input").value = url_params.get("i");
    }

    if(url_params.get("u"))
    {
        get("unlocked_letters").value = url_params.get("u");
    }

    if(url_params.get("s"))
    {
        get("letter_sets").value = url_params.get("s");
    }

    if(url_params.get("c")) get("option_color").checked = url_params.get("c");
    if(url_params.get("o")) get("option_color").checked = url_params.get("o");


    get("unlocked_letters").addEventListener("input", encodeText);
    get("letter_sets").addEventListener("input", encodeText);
    get("input").addEventListener("input", encodeText);
}



init();