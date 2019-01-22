module.exports = {
  gifExclusion: [
    "youtube", "twitter", "news", "minus", 
    "streamable", "reddit", "redd.it", "youtu.be", "webm"
  ],

  /* URL filters */
  musicFilter(url) {
    //we don't want self reddit posts to be returned for music
    return url.includes('youtube.com') || 
           url.includes('spotify');
  },

  urlFilter(url) {
    return !url.includes('reddit') && !url.includes("redd.it");
  },

  imgFilter(url) {
    return !url.includes('gif') && !url.includes('webm');
  },

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

  /* Text filters */
  bodyFilter(text) {
    console.log(text.length);
  },

  selectFilter(filter, post) {
    if(filter == "music") {
      return this.musicFilter(post.url)
    }
    else if(filter == "gif") {
      return this.gifFilter(post.url);
    }
    else if(filter == "image") {
      return this.imgFilter(post.url);
    }
    else if(filter == "url") {
      return this.urlFilter(post.url);
    }
    else if(filter == "body") {
      return this.bodyFilter(post.selftext);
    }
    else {
      //no filter, just pass it
      return true;
    }
  },

  animeFilter(url) {
    return this.gifFilter(url) &&
           !url.includes("akira.tits-are");
  },
}