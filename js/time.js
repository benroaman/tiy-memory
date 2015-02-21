game.Time = function(spec) {

  return {
    name: spec.name,
    min: spec.min,
    sec: spec.sec,
    total: Number(spec.min) * 60 + Number(spec.sec)
  };
}
