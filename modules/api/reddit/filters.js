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
    },
    "question": {
      func: "questionFilter",
      mediaType: "title"
    }
  },

  /* URL filters */
  musicFilter(url) {
    //we don't want self reddit posts to be returned for music
    return url.includes('youtube.com') || 
           url.includes('spotify');
  },

  urlFilter(url) {
    return !url.includes('reddit');
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

  questionFilter(post) {
    //if the post doesn't include reddit and has a question mark
    let title = post.toLowerCase();
    return !title.includes('reddit') && title.includes('?');
  },

  /* Specific Module & Misc Filters */
  animeFilter(url) {
    return this.gifFilter(url) &&
           !url.includes("akira.tits-are");
  },

  postGlobal(obj) {
    //log info
    console.log(`\nStats: \n---\nUpvotes: ${obj.ups}\nNSFW: ${obj.over_18}\n`);

    return obj.ups > 20;
  },

  selectFilter(filter, post) {
    let filterObj = this.filterMap[filter];

    if(filterObj !== undefined) {
      let media = post[filterObj.mediaType];
      let postFilter = this[filterObj.func](media);
      let globalFilter = this.postGlobal(post);

      //determine if filter passes
      return postFilter && globalFilter ? true : false;
    }
    else {
      //no filter, just pass it
      return true;
    }
  }
}