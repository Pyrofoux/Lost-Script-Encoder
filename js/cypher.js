

//abc-fsx-ryz-ikm-t
let params = {
    // "unlocked":"abcfkmstxz2458",
    // "sets":["abc","fsx","ryz","ikm","t"],
    // "order_sets":false,
    // "color_sets":true,
}

let chars = {
    "numeric":  "0123456789",
    "alpha":    "abcdefghijklmnopqrstuvwxyz",
    "space":    " ",
    "dash":     "-",
    "digit":    "/",
    "letter":   "|",
    "square0":   "◻",
    "square1":  "⚀",
    "square2":  "⚁",
    "square3":  "⚂",
    "square4":  "⚃" 
}


// let input = "2013 Bullock x Clooney Movie";
let input = "Practitioners often use swords as a metaphor for manhood. What is a knife? And what is spilt blood?";

function isNumericChar(char)
{
    return chars.numeric.indexOf(char) != -1
}

function isAlphaChar(char)
{
    return chars.alpha.indexOf(char) != -1
}

function isUnlocked(char)
{
    return params.unlocked.indexOf(char) != -1
}

function isGlyph(char)
{

}

function getUnlockedSet(letter)
{
    for(let set of params.sets)
    {
        if(set.indexOf(letter) != -1)
        {
            // Might spoil the set of letters that have never been unlocked
            let filtered_set = set.split("").filter(letter => isUnlocked(letter)).join("");
            return set;
        }
    }
    return null;
}


function cypher(input)
{

    input = input.toLowerCase();
    let textSegments = segmentInput(input);
    let cypheredSegments = textSegments.map(segment => segment.cypher());

    // clean up step: remove dashes if they're not between two small alpha segments
    for(let i = 0; i < cypheredSegments.length; i++)
    {
        let current = cypheredSegments[i], next = cypheredSegments[i+1];
        if(current.chars[current.chars.length-1] == chars.dash)
        {
            if(!(next && next.isShort))
            {
                current.chars = current.chars.slice(0,current.chars.length-1);
            }
        }
    }


    return cypheredSegments;
}

function segmentInput(input)
{
    let segments = [];
    let segment = null;

    function pushSegment()
    {
        if(segment.needsSubdivision() == false)
        {
            segments.push(segment);
        }
        else
        {
            let sub_segments = segment.subdivisize();
            for(let sub of sub_segments)
            {
                segments.push(sub)
            }
        }
        
        segment = null;
    }

    for(let char of input)
    {
        let new_segment = segment == null;

        // on a space: stop the current sequence
        if(char == chars.space && !new_segment)
        {
            pushSegment();
            continue;
        }

        if(new_segment)
        {
            segment = new TextSegment(char);
            continue;
        }
        else
        {
            if(segment.matchType(char))
            {
                segment.append(char)
            }
            else
            {
                pushSegment();
                segment = new TextSegment(char);
            }
        }
    }

    if(segment != null)
    {
        pushSegment();
    }
    return segments;
}






