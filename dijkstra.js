const arrayToGraph = (vertices) => {
	const graph = {};
	vertices.forEach(({ cost, from_point_id, to_point_id }) => {
		if (!graph[from_point_id]) graph[from_point_id] = {};
		graph[from_point_id][to_point_id] = cost;

		// Uncomment the following lines if the graph is undirected
		// if (!graph[to_point_id]) graph[to_point_id] = {};
		// graph[to_point_id][from_point_id] = cost;
	});
	return graph;
};

const dijkstra = (vertices, start, end) => {
	const graph = arrayToGraph(vertices);

	const pq = [{ cost: 0, vertex: start }];
	const dist = {};
	const pred = {};
	const discoveryOrder = [];

	for (const vertex in graph) {
		dist[vertex] = Infinity;
		pred[vertex] = null;
	}
	dist[start] = 0;

	while (pq.length > 0) {
		const current = pq.shift();
		const currentDist = current.cost;
		const currentVertex = current.vertex;

		if (!discoveryOrder.includes(currentVertex)) {
			discoveryOrder.push(currentVertex);
		}

		if (currentVertex === end) {
			const path = [];
			let vertex = end;
			while (vertex !== null) {
				path.unshift(vertex);
				vertex = pred[vertex];
			}
			return { totalCost: currentDist, path, discoveryOrder };
		}

		for (const neighbor in graph[currentVertex]) {
			const weight = graph[currentVertex][neighbor];
			const distance = currentDist + weight;

			if (distance < dist[neighbor]) {
				dist[neighbor] = distance;
				pred[neighbor] = currentVertex;
				pq.push({ cost: distance, vertex: neighbor });
				pq.sort((a, b) => a.cost - b.cost);
			}
		}
	}
};

const vertices = [
	{ cost: 1, from_point_id: 'A', to_point_id: 'B' },
	{ cost: 3, from_point_id: 'A', to_point_id: 'D' },
	{ cost: 4, from_point_id: 'B', to_point_id: 'D' },
	{ cost: 2, from_point_id: 'B', to_point_id: 'E' },
	{ cost: 5, from_point_id: 'C', to_point_id: 'E' },
	{ cost: 6, from_point_id: 'C', to_point_id: 'F' },
	{ cost: 1, from_point_id: 'D', to_point_id: 'E' },
	{ cost: 2, from_point_id: 'E', to_point_id: 'F' },
];

const { totalCost, path, discoveryOrder } = dijkstra(vertices, 'A', 'F');
console.log(`Total Cost: ${totalCost}`);
console.log(`Path: ${path}`);
console.log(`Discovery Order: ${discoveryOrder}`);
