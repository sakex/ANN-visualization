class Mutation {
    constructor(last_weight, last_result) {
        this.weight = last_weight;
        this.last_result = last_result;
        this.interval = [-Infinity, Infinity];
        this.direction = 0;
        this.unfruitful = 0;
        this.interval_found = false;
        this.iterations = 0;
        this.gradient = 10;
    }

    mutate(wealth) {
        const delta = wealth - this.last_result;
        const prev_direction = this.direction;
        if (this.direction == 0 || this.direction == 1) this.direction = delta > 0 ? 1 : -1;
        else if (this.direction == -1) this.direction = delta > 0 ? -1 : 1;
        const index = this.direction == -1 ? 1 : 0;
        this.interval[index] = this.weight;

        if (prev_direction != this.direction && prev_direction !== 0) {
            // Check direction change
            this.interval_found = true;
        }
        if (!this.interval_found) {
            ++this.unfruitful;
            this.set_weight(this.weight + this.gradient * this.direction);
            this.gradient--;
        } else {
            this.iterations++;
            const new_weight = (this.interval[1] + this.interval[0]) / 2;
            this.set_weight(new_weight);
        }
        this.last_result = wealth;
    }

    set_weight(new_weight) {
        this.weight = new_weight;
    }
}

const tryToFind = x => {
    if (x >= 4 || x <= -2) return -100000;
    return x ** 3 - 3 * x ** 2 - 6 * x + 8;
};

const main = () => {
    const weight = 4;
    const last_result = tryToFind(weight);
    const mutation = new Mutation(weight, last_result);
    console.log('First wealth', last_result);
    for (let x = 0; x < 10; ++x) {
        console.log(mutation.interval);
        const wealth = tryToFind(mutation.weight);
        console.log(wealth);
        mutation.mutate(wealth);
    }
};

main();
