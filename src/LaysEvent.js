const LaysEvent = () => {
    const queue = {};

    return {
        fire(event) {
            const handlers = queue[event];

            if (typeof handlers === 'undefined') {
                return;
            }

            handlers.map((handler) => handler());
        },

        on(event, callback) {
            if (typeof queue[event] === 'undefined')
                queue[event] = [];

            queue[event].push(callback);
        }
    };
};

export default LaysEvent();

