const LaysQueue = (size) => {
    const queue = [];

    size = size || Infinity;

    queue.fixedSize = size;

    queue.push = function() {
        [].push.apply(this, arguments);

        if (this.length <= this.fixedSize)
            return [];
        
        return this.splice(0, this.length - this.fixedSize);
    };

    queue.unshift = function() {
        [].unshift.apply(this, arguments);
    
        if (this.length <= this.fixedSize)
            return [];
        
        return this.splice(this.fixedSize);
    };

    return queue;
};

export default LaysQueue;

