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

        <Graph parser={new PhenotypeParser()} data={nodes} width={2000} height={800} />
    </div>
);

export default Home;
