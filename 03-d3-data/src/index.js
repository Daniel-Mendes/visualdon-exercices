import * as d3 from 'd3';

const parseData = (users, posts) => {
    return users.map(user => {
        const userPosts = posts.filter(post => post.userId === user.id);
        return {
            nom_utilisateur: user.name,
            ville: user.address.city,
            nom_companie: user.company.name,
            posts: userPosts,
            titres_posts: [
                ...userPosts.map(post => post.title)
            ]
        };
    });
}

const drawBarChart = (data) => {
    const svg = d3.select('svg');
    const width = +svg.attr('width');
    const height = +svg.attr('height');

    const xValue = d => d.nom_utilisateur;
    const yValue = d => d.titres_posts.length;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleBand()
        .domain(data.map(xValue))
        .range([0, innerWidth])
        .padding(0.2);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, yValue)])
        .range([innerHeight, 0]);

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    g.append('g').call(d3.axisLeft(yScale));
    g.append('g').call(d3.axisBottom(xScale))
        .attr('transform', `translate(0,${innerHeight})`);

    g.selectAll('rect').data(data)
        .enter().append('rect')
        .attr('y', d => yScale(yValue(d)))
        .attr('width', xScale.bandwidth())
        .attr('height', d => innerHeight - yScale(yValue(d)))
        .attr('x', d => xScale(xValue(d)));
}

const getLongestPost = (users) => {
    return users.reduce((acc, user) => {
        user.posts.map(post => {
            if (post.body.length > acc.length) {
                acc = post.body;
            }
        });
        return acc;
    });
}


Promise.all([
    d3.json('https://jsonplaceholder.typicode.com/users'),
    d3.json('https://jsonplaceholder.typicode.com/posts')
])
.then(([users, posts]) => {
    return parseData(users, posts);
})
.then(usersWithPosts => {
    drawBarChart(usersWithPosts);

    d3.append('text')
        .attr('x', 0)
        .attr('y', 0)
        .text(getLongestPost(usersWithPosts).nom_utilisateur);

    console.log(getLongestPost(usersWithPosts).nom_utilisateur);
});
