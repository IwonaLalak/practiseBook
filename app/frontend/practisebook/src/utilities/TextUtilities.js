export default{

    formatShortenedText(text, long){
        if(text.length > long)
            return text.substr(0,long) + '...'
        else
            return text
    }
}