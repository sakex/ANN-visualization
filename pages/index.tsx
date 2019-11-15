import React from 'react';
import Head from 'next/head';
import Graph from '../components/Graph';
import { PhenotypeParser } from '../src/PhenotypeParser';
import nodes from '../data/nodes.json';
import Strategy from '../components/Strategy';
import curve from '../data/curve.json';

const Home = () => (
    <div>
        <Head>
            <title>Home</title>
        </Head>
        <Graph parser={new PhenotypeParser()} data={nodes} width={400000} height={800} />

        <Strategy data={curve} width={1800} height={800} />
    </div>
);

export default Home;
