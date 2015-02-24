game.Time = function(spec) {

  return {
    name: spec.name,
    min: spec.min,
    sec: spec.sec,
    mil: spec.mil,
    total: (Number(spec.min) * 60 + Number(spec.sec))*100 + Number(spec.mil)
  };
}
