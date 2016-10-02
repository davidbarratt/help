class Entity {

  /**
   * Create a new entity with an object that has the same properties. If extra
   * properties are present, they will be ignored.
   */
  static create (data) {
    let entity = new this();

    if (typeof data !== 'object') {
      return entity;
    }

    return this.setProperites(entity, data);
  }

  /**
   * Merges multiple objects into a new object with the properties of all of
   * the objects.
   */
  static merge (...objects) {
    let entity = new this();

    for (let i = 0; i < objects.length; i++) {
      if (typeof objects[i] !== 'object') {
        continue;
      }

      entity = this.setProperites(entity, objects[i]);
    }

    return entity;
  }

  /**
   * Sets the properties of the target based on the source.
   */
  static setProperites (target, source) {
    let base = new target.constructor();

    let props = Object.getOwnPropertyNames(source);
    for (let i = 0; i < props.length; i++) {
      let prop = props[i];
      if (base.hasOwnProperty(prop) && target.hasOwnProperty(prop)) {
        // If the existing property is an entity instance, then allow that
        // entity to construct itself rather than returning an annoynomous
        // object.
        if (target[prop] instanceof Entity) {
          target[prop] = target[prop].constructor.merge(target[prop], source[prop]);
        // Only update the property if it's different than the base.
        } else if (target[prop] !== source[prop] && source[prop] !== null) {
          target[prop] = source[prop];
        }
      }
    }

    return target;
  }

}

export default Entity;
