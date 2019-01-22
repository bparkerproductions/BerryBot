module.exports = {
  gifExclusion: [
    "youtube", "twitter", "news", "minus", 
    "streamable", "reddit", "redd.it", "youtu.be", "webm"
  ],

  filterMap: {
    "music": {
      func: "musicFilter",
      mediaType: "url"
    },
    "gif": {
      func: "gifFilter",
      mediaType: "url"
    },
    "image": {
      func: "imgFilter",
      mediaType: "url"
    },
    "url": {
      func: "urlFilter",
      mediaType: "url"
    },
    "titlebody": {
      func: "bodyFilter",
      mediaType: "selftext"
    }
  },

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
    return text.length < 2000 && text.length > 15 ? true : false;
  },

  selectFilter(filter, post) {
    let filterObj = this.filterMap[filter];

    if(filterObj !== undefined) {
      let media = post[filterObj.mediaType];
      return this[filterObj.func](media);
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