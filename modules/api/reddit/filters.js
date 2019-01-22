module.exports = {
  musicFilter(url) {
    //we don't want self reddit posts to be returned for music
    return url.includes('youtube.com') || 
           url.includes('spotify');
  },

  urlFilter(url) {
    return !url.includes('reddit') && !url.includes("redd.it");
  },

  imgFilter(url) {
    return true;
  },

  gifExclusion: [
    "youtube", "twitter", "news", "minus", 
    "streamable", "reddit", "redd.it", "youtu.be", "webm"
  ],

  gifFilter(url) {
    let arr = this.gifExclusion;

    for(let i=0; i<arr.length; i++) {
      if(url.includes(arr[i])) {
        return false; //it includes a filtered out word, don't pass
      }
    };

    //filter passed, return
    return true;
  },

  selectFilter(filter, post) {
    if(filter == "music") {
      return this.musicFilter(post.url)
    }
    if(filter == "gif") {
      return this.gifFilter(post.url);
    }
    else {
      return this.urlFilter(post.url);
    }
  },

  animeFilter(url) {
    return this.gifFilter(url) &&
           !url.includes("akira.tits-are");
  },
}