import { createStore } from 'vuex';

const store = createStore({
  state: {
    modelValue: null,
    movies:[	{
		"id": 1,
		"title": "The Godfather",
		"description": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
		"image": "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UY1982_.jpg",
	     "year":2020,
		 "actors":
		 [{
			
			"actorName":"aa",
			"actorAge":55,
			"joinDate":2020,
			"actor’s role":"Background role"
			
		 },
		 {
			"actorName":"bb",
			"actorAge":50,
			"joinDate":2020,
			"actor'sRole":"Cameo"
		 }
		
		]
	},
	{
		"id": 2,
		"title": "The Shawshank Redemption",
		"description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
		"image": "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1200_.jpg",
		"year":2012,
		"actors":
		[{
		   
		   "actorName":"aa",
		   "actorAge":55,
		   "joinDate":2020,
		   "actor’s role":"Background role"
		   
		},
		{
		   "actorName":"bb",
		   "actorAge":50,
		   "joinDate":2020,
		   "actor’s role":"Cameo"
		},
		{
			"actorName":"bb",
			"actorAge":50,
			"joinDate":2020,
			"actor’s role":"Cameo"
		 }
	   
	   ]
	
		
		
	},
	{
		"id": 3,
		"title": "The Dark Knight",
		"description": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
		"image": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UY2048_.jpg",
		"year":2018,
		"actors":
		[{
		   
		   "actorName":"aa",
		   "actorAge":55,
		   "joinDate":2020,
		   "actor’s role":"Background role"
		   
		},
		{
		   "actorName":"bb",
		   "actorAge":50,
		   "joinDate":2020,
		   "actor’s role":"Cameo"
		}
	   
	   ]
		
	}]
  },
  
  mutations: {
    SAVE_MOVIE(state, data) {
      state.movies.push(data);
    },
	UPDATE_MOVIE(state, data){
		state.movies = state.movies.map((m) => {
			if (m.id === data.id) {
			  return data;
			}
			return m;
		  })
	}
  },
  actions: {
    saveMovie({ commit }, data) {
      const isNew = !this.state.movies.some((movie) => movie.id === data.id);
      if (isNew) {
        commit('SAVE_MOVIE', data);
      } else {
        commit('UPDATE_MOVIE', data);

      }
    }
  },
  getters: {
    // Define getters to access the state
    getData: (state) => state.data
  }
});

export default store;