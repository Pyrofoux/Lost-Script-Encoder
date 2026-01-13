class CypherSegment extends Segment
{
    constructor(chars)
    {
        super();
        this.chars = chars;
        this.decorators = [];
        this.isShort = false;
    }

    toString()
    {
        return `${this.chars.join("")}`
    }
}