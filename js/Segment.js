class Segment
{

    constructor(char)
    {
        this.chars = [char];
    }

    append(char)
    {
        this.chars.push(char);
    }

    subdivisize(group_length = 4) // make groupings of four
    {
        let howmany = Math.ceil(this.chars.length / group_length);
        let sub_segments = [];
        for(let s = 1; s <= howmany; s++)
        {
            let sub_segment = this.extract((s-1)*group_length, group_length);
            if(s < howmany) sub_segment.continued = true;
            sub_segments.push(sub_segment);
        }
        return sub_segments;
    }

    toString()
    {
        return `[${this.chars.join("")}]`
    }
}