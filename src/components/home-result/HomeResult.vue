<template>
  <div>
    <h1 class="title">
      Result
    </h1>
    <p class="subtitle">
      Total Tweet: {{ result.count }}
    </p>
    <BTabs
      position="is-centered"
      class="block"
    >
      <BTabItem
        v-for="query in result.query"
        :key="query.id"
        :label="query.name"
      >
        <h2 class="title">
          {{ query.name }}
        </h2>
        <h3 class="subtitle">
          Number of Tweets: {{ query.tweet.length }}
        </h3>
        <div
          v-for="tweet in query.tweet"
          :key="tweet.tweetContent.id"
          class="box"
        >
          <article class="media">
            <div class="media-left">
              <figure class="image is-64x64">
                <img
                  :src="tweet.tweetContent.createdBy.profileImageUrl"
                  alt="Profile Placeholder"
                >
              </figure>
            </div>
            <div class="media-content">
              <div class="content">
                <h4 class="title">
                  {{ tweet.tweetContent.createdBy.name }}
                </h4>
                <h5 class="subtitle">
                  @{{ tweet.tweetContent.createdBy.screenName }}
                </h5>
                <p v-html="tweet.result" />
                <p>
                  <a :href="tweet.tweetContent.url">
                    {{ tweet.tweetContent.tweetLocalCreationDate }}
                  </a>
                </p>
              </div>
            </div>
          </article>
        </div>
      </BTabItem>
    </BTabs>
  </div>
</template>

<script src="./HomeResult.js">
</script>
