const List_Film = [
    {
        judul: "Iron Man",
        tahun: 2008,
        genre: "Action",
        rating: 7.9
    },
    {
        judul: "The Incredible Hulk",
        tahun: 2008,
        genre: "Action",
        rating: 6.6
    },
    {
        judul: "Iron Man 2",
        tahun: 2010,
        genre: "Action",
        rating: 6.9
    },
    {
        judul: "Thor",
        tahun: 2011,
        genre: "Fantasy",
        rating: 7.0
    },
    {
        judul: "Captain America: The First Avenger",
        tahun: 2011,
        genre: "Action",
        rating: 6.9
    },
    {
        judul: "The Avengers",
        tahun: 2012,
        genre: "Action",
        rating: 8.0
    },
    {
        judul: "Guardians of the Galaxy",
        tahun: 2014,
        genre: "Sci-Fi",
        rating: 8.0
    },
    {
        judul: "Avengers: Age of Ultron",
        tahun: 2015,
        genre: "Action",
        rating: 7.3
    },
    {
        judul: "Avengers: Infinity War",
        tahun: 2018,
        genre: "Action",
        rating: 8.4
    },
    {
        judul: "Avengers: Endgame",
        tahun: 2019,
        genre: "Action",
        rating: 8.4
    }
];

console.log();
console.log("DATA FILM MCU");
console.table(List_Film);

console.log();
console.log();

console.log("MAP()");
const daftarJudul = List_Film.map(function(film) {
    return `${film.judul} (${film.tahun})`;
});

console.log("Daftar film beserta tahun rilis:");
console.log(daftarJudul);

console.log();
console.log();

console.log("FILTER()");
const filmRatingTinggi = List_Film.filter(function(film) {
    return film.rating >= 8.0;
});

console.log("Film dengan rating minimal 8.0:");
console.table(filmRatingTinggi);

console.log();
console.log();

console.log("REDUCE()");
const totalRating = List_Film.reduce(function(total, film) {
    return total + film.rating;
}, 0);

console.log("Total seluruh rating:", totalRating.toFixed(1));

console.log();
console.log();

console.log("FIND()");
const filmEndgame = List_Film.find(function(film) {
    return film.judul === "Avengers: Endgame";
});

console.log("Film yang dicari:");
console.log(filmEndgame);

console.log();
console.log();

console.log("SOME()");
const adaRatingDiAtas85 = List_Film.some(function(film) {
    return film.rating > 8.5;
});

console.log(
    "Apakah ada film dengan rating di atas 8.5?",
    adaRatingDiAtas85
);

console.log();
console.log();

console.log("EVERY()");
const semuaRatingMinimal6 = List_Film.every(function(film) {
    return film.rating >= 6.0;
});

console.log(
    "Apakah semua film memiliki rating minimal 6.0?",
    semuaRatingMinimal6
);

console.log();