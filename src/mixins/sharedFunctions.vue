<script>

// Shared functions and Data that will be reused in the project
const functions = {
    data: {
        sortChoices : [{ value: 'popularity.desc',
                        name: 'Most Popular'},
                        { value: 'popularity.asc',
                        name: 'Least Popular'},
                        { value: 'original_title.asc',
                        name: 'Title Ascending'},
                        { value: 'original_title.desc',
                        name: 'Title Descending'}],
    },
    methods: {
        giveHeights(numChar) {
            if (numChar < 37) {
            return '328px';
            } else if (numChar < 80) {
            return '305px';
            } else {
            return '295px';
            }
        },
        getPoster(posterPath) {
            const posterPathInit = 'https://image.tmdb.org/t/p/w500';

            if (!posterPath) {
            return 'url(https://semantic-ui.com/images/wireframe/image.png)';
            }
            return 'url(' + posterPathInit + posterPath + ')' ;
        },
    },
};
export default functions;
</script>
