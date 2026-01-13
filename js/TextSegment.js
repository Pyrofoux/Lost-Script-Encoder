class TextSegment extends Segment
{

    constructor(char)
    {
        super(char);
        this.type = TextSegment.char2type(char);
        this.continued = false;
    }


    static char2type(char)
    {
        if(isNumericChar(char))
        {
            return "numeric"
        }
        else if(isAlphaChar(char))
        {
            return "alpha";
        }
        else
        {
            return "other";
        }
    }

    matchType(char)
    {
        return this.type == TextSegment.char2type(char);
    }

    needsSubdivision()
    {
        if(this.type == "alpha" && this.chars.length > 4) return true;
        return false;
    }


    extract(start, length = 1)
    {
        let extracted_segment = new TextSegment(this.chars[start]); 
        for(let i = 1; i < length; i++)
        {
            if(start+i < this.chars.length)
            {
                let char = this.chars[start+i];
                extracted_segment.append(char);
            }
        }
        return extracted_segment;
    }

    subdivisize() // make groupings of four
    {
        let howmany = Math.ceil(this.chars.length / 4);
        let sub_segments = [];
        for(let s = 1; s <= howmany; s++)
        {
            let sub_segment = this.extract((s-1)*4, 4);
            if(s < howmany) sub_segment.continued = true;
            sub_segments.push(sub_segment);
        }
        return sub_segments;
    }


    toString()
    {
        return `${this.chars.join("")}`
    }

    cypher()
    {
        this.cyphered = true;
        switch(this.type)
        {
            case "other":
                return new CypherSegment(this.chars);
            break;

            case "numeric":
                var output = [];
                for(let digit of this.chars)
                {
                    if(isUnlocked(digit))
                    {
                        output.push(digit);
                    }
                    else
                    {
                        output.push(chars.digit);
                    }
                }
                return new CypherSegment(output);
            break;

            case "alpha":
                
                let knowns = 0;
                var output = [];
                let isShort = this.chars.length < 4;
                let sets = [];

                for(let letter of this.chars)
                {
                    if(isUnlocked(letter))
                    {
                        knowns++;
                        if(isShort)
                        {
                            output.push(letter);
                        }
                        else
                        {
                            let detected_set = getUnlockedSet(letter);
                            // if(detected_set != null)
                            // {
                                sets.push(getUnlockedSet(letter));
                            // }
                            
                        }
                    }
                    else
                    {
                        if(isShort)
                        {
                            output.push(chars.letter);
                        }
                    }
                }


                if(!isShort)
                {
                    output.push(chars[`square${knowns}`]);
                }

                let seg = new CypherSegment(output);
                seg.isShort = isShort;

                if(isShort)
                {
                    if(!this.continued)
                    {
                        seg.append(chars.dash);
                    }
                }
                else
                {
                    if(this.continued)
                    {
                        seg.decorators["underline"] = true;
                    }

                    if(sets.length > 0)
                    {
                        seg.decorators["sets"] = sets;
                        if(!params["order_sets"])
                        {
                            seg.decorators["sets"] = seg.decorators["sets"].sort();
                        }
                    }
                }

                

                return seg;
            break;
        }
    }
}