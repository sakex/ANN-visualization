import React from 'react';
import Head from 'next/head';
import Graph from '../components/Graph';
import { PhenotypeParser } from '../src/PhenotypeParser';
import nodes from '../data/nodes.json';

const Home = () => (
    <div>
        <Head>
            <title>Home</title>
        </Head>
        <Graph parser={new PhenotypeParser()} data={nodes.phenotypes} width={400000} height={800} />

    </div>
);

export default Home;
