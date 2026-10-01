// CoffeeCard — one coffee, laid out as an homage to the bag label.
//
// The label is a ruled box: wordmark across the top, a two-up tile row beneath
// it (country map | flavor icon), a second tile row (roast level | flavor
// profile), and a reversed footer bar reading "† SOLI DEO GLORIA! †".
//
// This card keeps the frame, the two-up tile row and the reversed footer, and
// drops the second tile row: roast level, roast date and the mellow→funky scale
// are not in the supplied lineup data, and the scale is the axis we were asked
// to remove. Tasting notes take that band instead.
import React from 'react';
import { LocationStamp } from './LocationStamp.jsx';

export function CoffeeCard({ coffee }) {
  const { name, origin, process, grade, notes, price, sizeNote, roastersFav } = coffee;

  return (
    <li className="bag">
      <div className="bag__frame">
        <h3 className="bag__name">{name}</h3>

        <div className="bag__tiles">
          <div className="bag__tile">
            <LocationStamp region={origin} size={62} className="bag__map" />
            <p className="bag__tile-label">
              {origin}
              {/* Grade sits under the country the way the real label sets the
                  growing region under COLOMBIA. */}
              {grade ? <span className="bag__tile-sub">{grade}</span> : null}
            </p>
          </div>

          {/* Dambi Uddo has no process in the supplied list. Falls back to
              "Single Origin" so no tile reads empty — Tyler corrects it if the
              lot is actually washed or natural. */}
          <div className="bag__tile">
            <p className="bag__tile-label bag__tile-label--solo">
              {process || 'Single Origin'}
            </p>
            {sizeNote ? <span className="bag__tile-sub">{sizeNote}</span> : null}
          </div>
        </div>

        <p className="bag__notes">{notes}</p>

        <p className="bag__price">
          <span className="bag__price-amount">${price}</span>
          {roastersFav ? <span className="bag__fav">† Roaster&rsquo;s Fav †</span> : null}
        </p>
      </div>
    </li>
  );
}
