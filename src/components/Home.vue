<template>
  <div class="hello">
    <li v-for="item in data.results" :key="data">
      <div id="movie-paper">
        <div id="movie-poster" :style="{ backgroundImage: 'url(' + getPoster(item.poster_path) + ')'}" v-bind="item" />
        <div>
         {{ item.title }}
        </div>
        <div>
         {{ item.release_date }}
        </div>
      </div>
    </li>
    <li>
      <ul>
       {{data.results[movieCounter].title}}
      </ul>
      <ul>
        <button @click="nextMovie()">Next Moviedsds</button>
      </ul>
    </li>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
  @Prop() private msg!: string;
  movieCounter = 0
  data: object = {

                    "page": 3,
                    "total_results": 10000,
                    "total_pages": 500,
                    "results": [
                      {
                        "popularity": 43.222,
                        "vote_count": 5011,
                        "video": false,
                        "poster_path": "\/azL2ThbJMIkts3ZMt3j1YgBUeDB.jpg",
                        "id": 98566,
                        "adult": false,
                        "backdrop_path": "\/3eGlcdyxqEN57TtU8ypx52V4JMs.jpg",
                        "original_language": "en",
                        "original_title": "Teenage Mutant Ninja Turtles",
                        "genre_ids": [
                          28,
                          12,
                          35,
                          14,
                          878
                        ],
                        "title": "Teenage Mutant Ninja Turtles",
                        "vote_average": 5.9,
                        "overview": "The city needs heroes. Darkness has settled over New York City as Shredder and his evil Foot Clan have an iron grip on everything from the police to the politicians. The future is grim until four unlikely outcast brothers rise from the sewers and discover their destiny as Teenage Mutant Ninja Turtles. The Turtles must work with fearless reporter April and her wise-cracking cameraman Vern Fenwick to save the city and unravel Shredder's diabolical plan.",
                        "release_date": "2014-08-07"
                      },
                      {
                        "popularity": 51.913,
                        "vote_count": 1,
                        "video": false,
                        "poster_path": "\/A11Ez4UkOE4Ysmtmur5Bho8qrGM.jpg",
                        "id": 611395,
                        "adult": false,
                        "backdrop_path": "\/tWcxJDjMo9gaNq4nLWW7dpzCbdI.jpg",
                        "original_language": "zh",
                        "original_title": "征途",
                        "genre_ids": [
                          28,
                          12
                        ],
                        "title": "Double World",
                        "vote_average": 5.5,
                        "overview": "Keen to bring honor to his clan, young villager Dong Yilong embarks on a perilous journey to compete in a tournament that selects warriors for battle.",
                        "release_date": "2019-11-22"
                      },
                      {
                        "popularity": 46.624,
                        "vote_count": 22865,
                        "video": false,
                        "poster_path": "\/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
                        "id": 155,
                        "adult": false,
                        "backdrop_path": "\/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg",
                        "original_language": "en",
                        "original_title": "The Dark Knight",
                        "genre_ids": [
                          28,
                          80,
                          18,
                          53
                        ],
                        "title": "The Dark Knight",
                        "vote_average": 8.4,
                        "overview": "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.",
                        "release_date": "2008-07-16"
                      },
                      {
                        "popularity": 42.989,
                        "vote_count": 23,
                        "video": false,
                        "poster_path": "\/jBeL6pPUPo0wnyTmiuxPegcibPf.jpg",
                        "id": 608195,
                        "adult": false,
                        "backdrop_path": "\/8LI4OEQGY2DIBTQQeRjYVKfL9Dl.jpg",
                        "original_language": "en",
                        "original_title": "Ghosts of War",
                        "genre_ids": [
                          14,
                          27,
                          53,
                          10752
                        ],
                        "title": "Ghosts of War",
                        "vote_average": 4.3,
                        "overview": "A group of World War II American soldiers encounter a supernatural enemy as they occupy a French castle previously under Nazi control.",
                        "release_date": "2020-07-03"
                      },
                      {
                        "popularity": 55.668,
                        "vote_count": 7,
                        "video": false,
                        "poster_path": "\/27eA9xGba61LtKr7gJRnhtDDgEP.jpg",
                        "id": 651586,
                        "adult": false,
                        "backdrop_path": "\/1iEDKZHREDetZcOoqioZewcHOw9.jpg",
                        "original_language": "es",
                        "original_title": "Superagente Makey",
                        "genre_ids": [
                          28,
                          35
                        ],
                        "title": "Superagente Makey",
                        "vote_average": 3.6,
                        "overview": "Makey is a humble police officer that, unexpectedly, gets caught in the middle of a dangerous international drug operation in the Costa del Sol, Spain.",
                        "release_date": "2020-07-17"
                      },
                      {
                        "popularity": 39.701,
                        "vote_count": 6194,
                        "video": false,
                        "poster_path": "\/oZRVDpNtmHk8M1VYy1aeOWUXgbC.jpg",
                        "id": 87101,
                        "adult": false,
                        "backdrop_path": "\/2ZbnHeSwwwejcOa5DkSienBFLA8.jpg",
                        "original_language": "en",
                        "original_title": "Terminator Genisys",
                        "genre_ids": [
                          28,
                          12,
                          878,
                          53
                        ],
                        "title": "Terminator Genisys",
                        "vote_average": 5.9,
                        "overview": "The year is 2029. John Connor, leader of the resistance continues the war against the machines. At the Los Angeles offensive, John's fears of the unknown future begin to emerge when TECOM spies reveal a new plot by SkyNet that will attack him from both fronts; past and future, and will ultimately change warfare forever.",
                        "release_date": "2015-06-23"
                      },
                      {
                        "popularity": 56.985,
                        "vote_count": 14313,
                        "video": false,
                        "poster_path": "\/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
                        "id": 299534,
                        "adult": false,
                        "backdrop_path": "\/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
                        "original_language": "en",
                        "original_title": "Avengers: Endgame",
                        "genre_ids": [
                          28,
                          12,
                          878
                        ],
                        "title": "Avengers: Endgame",
                        "vote_average": 8.3,
                        "overview": "After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore order to the universe once and for all, no matter what consequences may be in store.",
                        "release_date": "2019-04-24"
                      },
                      {
                        "popularity": 48.66,
                        "vote_count": 73,
                        "video": false,
                        "poster_path": "\/3wZ0gxLqsPleneFSTZILmM3BE8Q.jpg",
                        "id": 539181,
                        "adult": false,
                        "backdrop_path": "\/vpUUznNzW85xo02H16RaSxRNS1.jpg",
                        "original_language": "en",
                        "original_title": "Relic",
                        "genre_ids": [
                          18,
                          27
                        ],
                        "title": "Relic",
                        "vote_average": 6.2,
                        "overview": "When Edna—the elderly and widowed matriarch of the family—goes missing, her daughter and granddaughter travel to their remote family home to find her. Soon after her return, they start to discover a sinister presence haunting the house and taking control of Edna.",
                        "release_date": "2020-07-03"
                      },
                      {
                        "popularity": 43.617,
                        "vote_count": 12,
                        "video": false,
                        "poster_path": "\/osoQHmiOMlk1v4sNyIMkO8RF4cJ.jpg",
                        "id": 603119,
                        "adult": false,
                        "backdrop_path": "\/wmue8ULgckHrTc9eXALYoDbOAq0.jpg",
                        "original_language": "en",
                        "original_title": "The Silencing",
                        "genre_ids": [
                          28,
                          80,
                          53
                        ],
                        "title": "The Silencing",
                        "vote_average": 6.4,
                        "overview": "A reformed hunter becomes involved in a deadly game of cat and mouse when he and the local sheriff set out to track a vicious killer who may have kidnapped his daughter years ago.",
                        "release_date": "2020-07-18"
                      },
                      {
                        "popularity": 57.106,
                        "vote_count": 2896,
                        "video": false,
                        "poster_path": "\/8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg",
                        "id": 338762,
                        "adult": false,
                        "backdrop_path": "\/lP5eKh8WOcPysfELrUpGhHJGZEH.jpg",
                        "original_language": "en",
                        "original_title": "Bloodshot",
                        "genre_ids": [
                          28,
                          878
                        ],
                        "title": "Bloodshot",
                        "vote_average": 7,
                        "overview": "After he and his wife are murdered, marine Ray Garrison is resurrected by a team of scientists. Enhanced with nanotechnology, he becomes a superhuman, biotech killing machine—'Bloodshot'. As Ray first trains with fellow super-soldiers, he cannot recall anything from his former life. But when his memories flood back and he remembers the man that killed both him and his wife, he breaks out of the facility to get revenge, only to discover that there's more to the conspiracy than he thought.",
                        "release_date": "2020-03-05"
                      },
                      {
                        "popularity": 56.203,
                        "vote_count": 17556,
                        "video": false,
                        "poster_path": "\/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg",
                        "id": 671,
                        "adult": false,
                        "backdrop_path": "\/hziiv14OpD73u9gAak4XDDfBKa2.jpg",
                        "original_language": "en",
                        "original_title": "Harry Potter and the Philosopher's Stone",
                        "genre_ids": [
                          12,
                          14,
                          10751
                        ],
                        "title": "Harry Potter and the Philosopher's Stone",
                        "vote_average": 7.9,
                        "overview": "Harry Potter has lived under the stairs at his aunt and uncle's house his whole life. But on his 11th birthday, he learns he's a powerful wizard -- with a place waiting for him at the Hogwarts School of Witchcraft and Wizardry. As he learns to harness his newfound powers with the help of the school's kindly headmaster, Harry uncovers the truth about his parents' deaths -- and about the villain who's to blame.",
                        "release_date": "2001-11-16"
                      },
                      {
                        "popularity": 42.683,
                        "vote_count": 2773,
                        "video": false,
                        "poster_path": "\/wlfDxbGEsW58vGhFljKkcR5IxDj.jpg",
                        "id": 545609,
                        "adult": false,
                        "backdrop_path": "\/1R6cvRtZgsYCkh8UFuWFN33xBP4.jpg",
                        "original_language": "en",
                        "original_title": "Extraction",
                        "genre_ids": [
                          28,
                          18,
                          53
                        ],
                        "title": "Extraction",
                        "vote_average": 7.5,
                        "overview": "Tyler Rake, a fearless mercenary who offers his services on the black market, embarks on a dangerous mission when he is hired to rescue the kidnapped son of a Mumbai crime lord…",
                        "release_date": "2020-04-24"
                      },
                      {
                        "popularity": 51.374,
                        "id": 315635,
                        "video": false,
                        "vote_count": 14587,
                        "vote_average": 7.4,
                        "title": "Spider-Man: Homecoming",
                        "release_date": "2017-07-05",
                        "original_language": "en",
                        "original_title": "Spider-Man: Homecoming",
                        "genre_ids": [
                          28,
                          12,
                          878,
                          18
                        ],
                        "backdrop_path": "\/vc8bCGjdVp0UbMNLzHnHSLRbBWQ.jpg",
                        "adult": false,
                        "overview": "Following the events of Captain America: Civil War, Peter Parker, with the help of his mentor Tony Stark, tries to balance his life as an ordinary high school student in Queens, New York City, with fighting crime as his superhero alter ego Spider-Man as a new threat, the Vulture, emerges.",
                        "poster_path": "\/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg"
                      },
                      {
                        "popularity": 37.379,
                        "vote_count": 7806,
                        "video": false,
                        "poster_path": "\/dP5Fb6YRfzmCQtRbHOr2kO7tJW9.jpg",
                        "id": 262500,
                        "adult": false,
                        "backdrop_path": "\/8YNNyQiPZlF9qv5EGOUK20mnXVk.jpg",
                        "original_language": "en",
                        "original_title": "Insurgent",
                        "genre_ids": [
                          28,
                          12,
                          878,
                          53
                        ],
                        "title": "Insurgent",
                        "vote_average": 6.3,
                        "overview": "Beatrice Prior must confront her inner demons and continue her fight against a powerful alliance which threatens to tear her society apart.",
                        "release_date": "2015-03-18"
                      },
                      {
                        "popularity": 39.271,
                        "id": 150540,
                        "video": false,
                        "vote_count": 15205,
                        "vote_average": 7.9,
                        "title": "Inside Out",
                        "release_date": "2015-06-09",
                        "original_language": "en",
                        "original_title": "Inside Out",
                        "genre_ids": [
                          18,
                          35,
                          16,
                          10751
                        ],
                        "backdrop_path": "\/9cGSFGZVVLsrnbs0AFPDh6X2ynl.jpg",
                        "adult": false,
                        "overview": "Growing up can be a bumpy road, and it's no exception for Riley, who is uprooted from her Midwest life when her father starts a new job in San Francisco. Riley's guiding emotions— Joy, Fear, Anger, Disgust and Sadness—live in Headquarters, the control centre inside Riley's mind, where they help advise her through everyday life and tries to keep things positive, but the emotions conflict on how best to navigate a new city, house and school.",
                        "poster_path": "\/lRHE0vzf3oYJrhbsHXjIkF4Tl5A.jpg"
                      },
                      {
                        "popularity": 58.383,
                        "vote_count": 4976,
                        "video": false,
                        "poster_path": "\/pThyQovXQrw2m0s9x82twj48Jq4.jpg",
                        "id": 546554,
                        "adult": false,
                        "backdrop_path": "\/AbRYlvwAKHs0YuyNO6NX9ofq4l6.jpg",
                        "original_language": "en",
                        "original_title": "Knives Out",
                        "genre_ids": [
                          35,
                          80,
                          18,
                          9648,
                          53
                        ],
                        "title": "Knives Out",
                        "vote_average": 7.8,
                        "overview": "When renowned crime novelist Harlan Thrombey is found dead at his estate just after his 85th birthday, the inquisitive and debonair Detective Benoit Blanc is mysteriously enlisted to investigate. From Harlan's dysfunctional family to his devoted staff, Blanc sifts through a web of red herrings and self-serving lies to uncover the truth behind Harlan's untimely death.",
                        "release_date": "2019-11-27"
                      },
                      {
                        "popularity": 43.606,
                        "vote_count": 17456,
                        "video": false,
                        "poster_path": "\/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
                        "id": 120,
                        "adult": false,
                        "backdrop_path": "\/vRQnzOn4HjIMX4LBq9nHhFXbsSu.jpg",
                        "original_language": "en",
                        "original_title": "The Lord of the Rings: The Fellowship of the Ring",
                        "genre_ids": [
                          28,
                          12,
                          14
                        ],
                        "title": "The Lord of the Rings: The Fellowship of the Ring",
                        "vote_average": 8.3,
                        "overview": "Young hobbit Frodo Baggins, after inheriting a mysterious ring from his uncle Bilbo, must leave his home in order to keep it from falling into the hands of its evil creator. Along the way, a fellowship is formed to protect the ringbearer and make sure that the ring arrives at its final destination: Mt. Doom, the only place where it can be destroyed.",
                        "release_date": "2001-12-18"
                      },
                      {
                        "popularity": 44.211,
                        "vote_count": 3726,
                        "video": false,
                        "poster_path": "\/cCTJPelKGLhALq3r51A9uMonxKj.jpg",
                        "id": 320288,
                        "adult": false,
                        "backdrop_path": "\/phxiKFDvPeQj4AbkvJLmuZEieDU.jpg",
                        "original_language": "en",
                        "original_title": "Dark Phoenix",
                        "genre_ids": [
                          28,
                          12,
                          878
                        ],
                        "title": "Dark Phoenix",
                        "vote_average": 6,
                        "overview": "The X-Men face their most formidable and powerful foe when one of their own, Jean Grey, starts to spiral out of control. During a rescue mission in outer space, Jean is nearly killed when she's hit by a mysterious cosmic force. Once she returns home, this force not only makes her infinitely more powerful, but far more unstable. The X-Men must now band together to save her soul and battle aliens that want to use Grey's new abilities to rule the galaxy.",
                        "release_date": "2019-06-05"
                      },
                      {
                        "popularity": 47.053,
                        "vote_count": 14632,
                        "video": false,
                        "poster_path": "\/sdEOH0992YZ0QSxgXNIGLq1ToUi.jpg",
                        "id": 672,
                        "adult": false,
                        "backdrop_path": "\/bvRnPaai6JL7XHF4K6414DdSHro.jpg",
                        "original_language": "en",
                        "original_title": "Harry Potter and the Chamber of Secrets",
                        "genre_ids": [
                          12,
                          14
                        ],
                        "title": "Harry Potter and the Chamber of Secrets",
                        "vote_average": 7.7,
                        "overview": "Cars fly, trees fight back, and a mysterious house-elf comes to warn Harry Potter at the start of his second year at Hogwarts. Adventure and danger await when bloody writing on a wall announces: The Chamber Of Secrets Has Been Opened. To save Hogwarts will require all of Harry, Ron and Hermione’s magical abilities and courage.",
                        "release_date": "2002-11-13"
                      },
                      {
                        "popularity": 40.359,
                        "vote_count": 8520,
                        "video": false,
                        "poster_path": "\/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
                        "id": 335984,
                        "adult": false,
                        "backdrop_path": "\/sAtoMqDVhNDQBc3QJL3RF6hlhGq.jpg",
                        "original_language": "en",
                        "original_title": "Blade Runner 2049",
                        "genre_ids": [
                          18,
                          878
                        ],
                        "title": "Blade Runner 2049",
                        "vote_average": 7.4,
                        "overview": "Thirty years after the events of the first film, a new blade runner, LAPD Officer K, unearths a long-buried secret that has the potential to plunge what's left of society into chaos. K's discovery leads him on a quest to find Rick Deckard, a former LAPD blade runner who has been missing for 30 years.",
                        "release_date": "2017-10-04"
                      }
                    ]
                  }

  public nextMovie() {
    this.movieCounter++;
  }
  public getPoster(posterPath:string): string{
    const posterPathInit = 'https://image.tmdb.org/t/p/w500';
    return posterPathInit + posterPath;
  }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#movie-paper {
  width: 300px;
  height: 200px;
}
#movie-poster {
  height: 150px;
  top:50%;
  background-size: 100%;
}
</style>
