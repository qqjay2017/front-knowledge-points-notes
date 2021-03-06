function pubsub() {
    const subscribers = [];
    return {
      subscribe: function(subscriber) {
        subscribers.push(subscriber);
      },
      publish: function(publication) {
        const length = subscribers.length;
        for (let i = 0; i < length; i += 1) {
          subscribers[i](publication);
        }
      },
    };
  }

  const my_pubsub = pubsub('aaaa')

  my_pubsub.subscribe(function(publication){
    console.log(this,this,publication)
  })

  my_pubsub.publish()