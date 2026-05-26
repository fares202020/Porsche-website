import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import gt3 from '../../../assets/images/GT3_RS.avif';
import macan from '../../../assets/images/Macan.avif';
import taycan from '../../../assets/images/Taycan.avif';
import carrera from '../../../assets/images/911_Carrera.avif';
import turbo from '../../../assets/images/Turbo_S.avif';
import macanElectric from '../../../assets/images/Macan_Electric.avif';
import styles from './ManageCars.module.css';

const wheelOptions = ['Wheel Type 1', 'Wheel Type 2', 'Wheel Type 3', 'Wheel Type 4'];
const categories = ['SUV', 'Sports', 'Electric', 'Sedan', 'Coupe', 'Truck'];
const fuelTypes = ['Gasoline', 'Electric'];

const emptyCarForm = {
  name: '',
  make: 'Porsche',
  category: 'SUV',
  manufactureYear: '2026',
  price: '',
  thumbnailFileName: '',
  thumbnailPreview: '',
  description: '',
  colors: '',
  wheels: [],
  horsepower: '',
  topSpeed: '',
  fuelType: 'Gasoline',
  seating: '',
  modelFileName: '',
  status: 'In Stock',
};

const initialFormErrors = {
  name: '',
  price: '',
  thumbnailFileName: '',
  category: '',
  manufactureYear: '',
  description: '',
  colors: '',
  wheels: '',
  horsepower: '',
  topSpeed: '',
  fuelType: '',
  seating: '',
  modelFileName: '',
};

const initialFormTouched = {
  name: false,
  price: false,
  thumbnailFileName: false,
  category: false,
  manufactureYear: false,
  description: false,
  colors: false,
  wheels: false,
  horsepower: false,
  topSpeed: false,
  fuelType: false,
  seating: false,
  modelFileName: false,
};

const initialCars = [
  {
    id: 1,
    image: turbo,
    name: '911 Turbo S Cabriolet',
    make: 'Porsche',
    category: 'Sports',
    year: 2026,
    price: 450000,
    description: 'Open-top performance model with grand touring comfort.',
    colors: 'Black, White, Guards Red, Carrara White',
    wheels: ['Wheel Type 1', 'Wheel Type 3'],
    horsepower: 640,
    topSpeed: 205,
    fuelType: 'Gasoline',
    seating: 2,
    modelFileName: 'porsche-911-turbo-s.glb',
    status: 'In Stock',
  },
  {
    id: 2,
    image: macan,
    name: 'Macan',
    make: 'Porsche',
    category: 'SUV',
    year: 2026,
    price: 90000,
    description: 'Compact luxury SUV tuned for daily comfort and sharp handling.',
    colors: 'Black, Silver, White, Volcano Grey',
    wheels: ['Wheel Type 2'],
    horsepower: 261,
    topSpeed: 144,
    fuelType: 'Gasoline',
    seating: 4,
    modelFileName: 'porsche-macan.glb',
    status: 'In Stock',
  },
  {
    id: 3,
    image: taycan,
    name: 'Taycan',
    make: 'Porsche',
    category: 'Electric',
    year: 2025,
    price: 130000,
    description: 'Electric sports sedan with instant torque and long-distance refinement.',
    colors: 'Frozen Blue, Black, White, Carmine Red',
    wheels: ['Wheel Type 1', 'Wheel Type 4'],
    horsepower: 402,
    topSpeed: 143,
    fuelType: 'Electric',
    seating: 4,
    modelFileName: 'porsche-taycan.glb',
    status: 'In Stock',
  },
  {
    id: 4,
    image: carrera,
    name: '911 Carrera',
    make: 'Porsche',
    category: 'Sedan',
    year: 2026,
    price: 185000,
    description: 'Core 911 experience with timeless design and everyday usability.',
    colors: 'Black, White, Guards Red, Arctic Grey',
    wheels: ['Wheel Type 2', 'Wheel Type 3'],
    horsepower: 388,
    topSpeed: 183,
    fuelType: 'Gasoline',
    seating: 2,
    modelFileName: 'porsche-911-carrera.glb',
    status: 'In Stock',
  },
  {
    id: 5,
    image: gt3,
    name: '911 GT3 RS',
    make: 'Porsche',
    category: 'Sports',
    year: 2026,
    price: 412000,
    description: 'Track-focused 911 with motorsport aerodynamics and naturally aspirated power.',
    colors: 'White, Black, Python Green, Guards Red',
    wheels: ['Wheel Type 3', 'Wheel Type 4'],
    horsepower: 518,
    topSpeed: 184,
    fuelType: 'Gasoline',
    seating: 2,
    modelFileName: 'porsche-911-gt3-rs.glb',
    status: 'In Stock',
  },
  {
    id: 6,
    image: macanElectric,
    name: 'Macan Electric',
    make: 'Porsche',
    category: 'SUV',
    year: 2026,
    price: 90000,
    description: 'All-electric Macan with compact SUV practicality and Porsche response.',
    colors: 'White, Black, Provence, Oak Green',
    wheels: ['Wheel Type 1', 'Wheel Type 2'],
    horsepower: 355,
    topSpeed: 137,
    fuelType: 'Electric',
    seating: 4,
    modelFileName: 'porsche-macan-electric.glb',
    status: 'Out of Stock',
  },
];

function formatCurrency(value) {
  return `$${value.toLocaleString()}`;
}

function toFormState(car) {
  return {
    name: car.name || '',
    make: car.make || 'Porsche',
    category: car.category || 'SUV',
    manufactureYear: String(car.year || '2026'),
    price: String(car.price || ''),
    thumbnailFileName: car.thumbnailFileName || 'Current thumbnail',
    thumbnailPreview: car.image || '',
    description: car.description || '',
    colors: car.colors || '',
    wheels: car.wheels || [],
    horsepower: String(car.horsepower || ''),
    topSpeed: String(car.topSpeed || ''),
    fuelType: car.fuelType || 'Gasoline',
    seating: String(car.seating || ''),
    modelFileName: car.modelFileName || '',
    status: car.status || 'In Stock',
  };
}

function pickDefaultImage(category) {
  if (category === 'SUV') {
    return macan;
  }

  if (category === 'Electric') {
    return taycan;
  }

  if (category === 'Sedan') {
    return carrera;
  }

  return gt3;
}

function isBlank(value) {
  return !String(value || '').trim();
}

function validatePositiveNumber(value, label) {
  if (isBlank(value)) {
    return `${label} is required.`;
  }

  if (Number(value) <= 0) {
    return `${label} must be greater than 0.`;
  }

  return '';
}

function validateCarForm(values) {
  const nextErrors = { ...initialFormErrors };

  if (isBlank(values.name)) {
    nextErrors.name = 'Car name is required.';
  }

  nextErrors.price = validatePositiveNumber(values.price, 'Price');
  nextErrors.horsepower = validatePositiveNumber(values.horsepower, 'Horse power');
  nextErrors.topSpeed = validatePositiveNumber(values.topSpeed, 'Top speed');
  nextErrors.seating = validatePositiveNumber(values.seating, 'Seating');

  if (isBlank(values.manufactureYear)) {
    nextErrors.manufactureYear = 'Manufacture year is required.';
  } else if (Number(values.manufactureYear) < 1948) {
    nextErrors.manufactureYear = 'Manufacture year must be 1948 or later.';
  }

  if (isBlank(values.thumbnailFileName)) {
    nextErrors.thumbnailFileName = 'Thumbnail image is required.';
  }

  if (isBlank(values.description)) {
    nextErrors.description = 'Description is required.';
  }

  if (isBlank(values.colors)) {
    nextErrors.colors = 'Available colors are required.';
  }

  if (!values.wheels.length) {
    nextErrors.wheels = 'Choose at least one wheel type.';
  }

  if (isBlank(values.modelFileName)) {
    nextErrors.modelFileName = '3D model file is required.';
  }

  return nextErrors;
}

function getVisibleError(submitted, touched, field, error) {
  return submitted || touched[field] ? error : '';
}

export default function ManageCars() {
  const [cars, setCars] = useState(initialCars);
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCarId, setEditingCarId] = useState(null);
  const [formData, setFormData] = useState(emptyCarForm);
  const [formErrors, setFormErrors] = useState(validateCarForm(emptyCarForm));
  const [formTouched, setFormTouched] = useState(initialFormTouched);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const totalCars = cars.length;
  const inStock = useMemo(
    () => cars.filter((car) => car.status === 'In Stock').length,
    [cars],
  );
  const filteredCars = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return cars;
    }

    return cars.filter((car) => {
      const searchableValues = [
        car.name,
        car.make,
        car.category,
        String(car.year),
        String(car.price),
        car.description,
        car.colors,
        car.fuelType,
        car.status,
      ]
        .join(' ')
        .toLowerCase();

      return searchableValues.includes(normalizedSearch);
    });
  }, [cars, search]);

  const dialogTitle = editingCarId ? 'Edit Car' : 'Add New Car';

  const openAddDialog = () => {
    setEditingCarId(null);
    setFormData(emptyCarForm);
    setFormErrors(validateCarForm(emptyCarForm));
    setFormTouched(initialFormTouched);
    setFormSubmitted(false);
    setIsDialogOpen(true);
  };

  const openEditDialog = (car) => {
    const nextFormData = toFormState(car);

    setEditingCarId(car.id);
    setFormData(nextFormData);
    setFormErrors(validateCarForm(nextFormData));
    setFormTouched(initialFormTouched);
    setFormSubmitted(false);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingCarId(null);
    setFormData(emptyCarForm);
    setFormErrors(validateCarForm(emptyCarForm));
    setFormTouched(initialFormTouched);
    setFormSubmitted(false);
  };

  const handleFieldChange = (event) => {
    const { name, value, checked, type, files } = event.target;

    if (type === 'checkbox' && name === 'status') {
      const nextFormData = {
        ...formData,
        status: checked ? 'In Stock' : 'Out of Stock',
      };

      setFormData(nextFormData);
      setFormErrors(validateCarForm(nextFormData));
      return;
    }

    if (type === 'file') {
      if (name === 'thumbnailImage') {
        const file = files?.[0];
        const nextFormData = {
          ...formData,
          thumbnailFileName: file?.name || formData.thumbnailFileName,
          thumbnailPreview: file ? URL.createObjectURL(file) : formData.thumbnailPreview,
        };

        setFormData(nextFormData);
        setFormTouched((current) => ({ ...current, thumbnailFileName: true }));
        setFormErrors(validateCarForm(nextFormData));
        return;
      }

      const nextFormData = {
        ...formData,
        modelFileName: files?.[0]?.name || formData.modelFileName,
      };

      setFormData(nextFormData);
      setFormTouched((current) => ({ ...current, modelFileName: true }));
      setFormErrors(validateCarForm(nextFormData));
      return;
    }

    const nextFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(nextFormData);
    setFormErrors(validateCarForm(nextFormData));
  };

  const handleFieldBlur = (event) => {
    const { name } = event.target;

    if (name === 'modelFile') {
      setFormTouched((current) => ({ ...current, modelFileName: true }));
      setFormErrors(validateCarForm(formData));
      return;
    }

    if (name === 'thumbnailImage') {
      setFormTouched((current) => ({ ...current, thumbnailFileName: true }));
      setFormErrors(validateCarForm(formData));
      return;
    }

    setFormTouched((current) => ({ ...current, [name]: true }));
    setFormErrors(validateCarForm(formData));
  };

  const handleWheelToggle = (wheel) => {
    setFormData((current) => {
      const isSelected = current.wheels.includes(wheel);
      const nextFormData = {
        ...current,
        wheels: isSelected
          ? current.wheels.filter((selectedWheel) => selectedWheel !== wheel)
          : [...current.wheels, wheel],
      };

      setFormErrors(validateCarForm(nextFormData));
      return nextFormData;
    });

    setFormTouched((current) => ({ ...current, wheels: true }));
  };

  const getError = (field) => getVisibleError(formSubmitted, formTouched, field, formErrors[field]);
  const getErrorId = (field) => {
    const error = getError(field);

    return error ? `car-${field}-error` : undefined;
  };

  const fieldErrorClass = (field) => (getError(field) ? styles.fieldError : '');

  const renderError = (field) => {
    const error = getError(field);

    if (!error) {
      return null;
    }

    return (
      <p className={styles.errorText} id={`car-${field}-error`} role="alert">
        {error}
      </p>
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateCarForm(formData);
    setFormSubmitted(true);
    setFormTouched({
      name: true,
      price: true,
      thumbnailFileName: true,
      category: true,
      manufactureYear: true,
      description: true,
      colors: true,
      wheels: true,
      horsepower: true,
      topSpeed: true,
      fuelType: true,
      seating: true,
      modelFileName: true,
    });
    setFormErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      return;
    }

    const normalizedCar = {
      name: formData.name.trim(),
      make: formData.make.trim() || 'Porsche',
      category: formData.category,
      year: Number(formData.manufactureYear) || 2026,
      price: Number(formData.price) || 0,
      thumbnailFileName: formData.thumbnailFileName,
      description: formData.description.trim(),
      colors: formData.colors.trim(),
      wheels: formData.wheels,
      horsepower: Number(formData.horsepower) || 0,
      topSpeed: Number(formData.topSpeed) || 0,
      fuelType: formData.fuelType,
      seating: Number(formData.seating) || 0,
      modelFileName: formData.modelFileName,
      status: formData.status,
    };

    if (editingCarId) {
      setCars((currentCars) =>
        currentCars.map((car) =>
          car.id === editingCarId
            ? {
                ...car,
                ...normalizedCar,
                image: formData.thumbnailPreview || car.image,
              }
            : car,
        ),
      );
    } else {
      setCars((currentCars) => {
        const nextId = Math.max(...currentCars.map((car) => car.id), 0) + 1;

        return [
          {
            ...normalizedCar,
            id: nextId,
            image: formData.thumbnailPreview || pickDefaultImage(normalizedCar.category),
          },
          ...currentCars,
        ];
      });
    }

    closeDialog();
  };

  const handleDeleteCar = (carId) => {
    setCars((currentCars) => currentCars.filter((car) => car.id !== carId));
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.titleRow}>
            <Link className={styles.backLink} to="/admin/dashboard">
              <i className="fa-solid fa-arrow-left"></i>
              Back to Dashboard
            </Link>
            <h1>Manage Cars</h1>
          </div>

          <button className={styles.primaryButton} type="button" onClick={openAddDialog}>
            <i className="fa-solid fa-plus"></i>
            Add New Car
          </button>
        </header>

        <section className={styles.controls} aria-label="Car filters">
          <label className={styles.searchBox} htmlFor="admin-car-search">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              id="admin-car-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by car name, category, year, or status..."
            />
          </label>
        </section>

        <section className={styles.summaryGrid} aria-label="Inventory summary">
          <article className={styles.summaryCard}>
            <span>Total Cars</span>
            <strong>{totalCars}</strong>
          </article>
          <article className={styles.summaryCard}>
            <span>In Stock</span>
            <strong>{inStock}</strong>
          </article>
          <article className={styles.summaryCard}>
            <span>Out of Stock</span>
            <strong>{totalCars - inStock}</strong>
          </article>
        </section>

        <section className={styles.tablePanel}>
          <div className={styles.tableWrap}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Year</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCars.map((car) => (
                  <tr key={car.id}>
                    <td>
                      <img className={styles.carImage} src={car.image} alt={car.name} />
                    </td>
                    <td>
                      <div className={styles.primaryText}>{car.name}</div>
                      <div className={styles.secondaryText}>{car.make}</div>
                    </td>
                    <td>{car.category}</td>
                    <td>{car.year}</td>
                    <td>{formatCurrency(car.price)}</td>
                    <td>
                      <span
                        className={`${styles.statusBadge} ${
                          car.status === 'In Stock' ? styles.inStock : styles.outStock
                        }`}
                      >
                        {car.status}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <button
                          className={styles.iconButton}
                          type="button"
                          onClick={() => openEditDialog(car)}
                          aria-label={`Edit ${car.name}`}
                          title="Edit car"
                        >
                          <i className="fa-regular fa-pen-to-square"></i>
                        </button>
                        <button
                          className={`${styles.iconButton} ${styles.dangerButton}`}
                          type="button"
                          onClick={() => handleDeleteCar(car.id)}
                          aria-label={`Delete ${car.name}`}
                          title="Delete car"
                        >
                          <i className="fa-regular fa-trash-can"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredCars.length === 0 ? (
            <div className={styles.emptyState}>No cars match your search.</div>
          ) : null}
        </section>
      </div>

      {isDialogOpen ? (
        <div className={styles.modalOverlay} role="presentation" onMouseDown={closeDialog}>
          <section
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="car-dialog-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header className={styles.dialogHeader}>
              <h2 id="car-dialog-title">{dialogTitle}</h2>
              <button
                className={styles.closeButton}
                type="button"
                onClick={closeDialog}
                aria-label="Close car dialog"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </header>

            <form className={styles.carForm} onSubmit={handleSubmit} noValidate>
              <div className={styles.formGrid}>
                <label className={styles.field}>
                  <span>Car Name</span>
                  <input
                    name="name"
                    type="text"
                    className={fieldErrorClass('name')}
                    value={formData.name}
                    onChange={handleFieldChange}
                    onBlur={handleFieldBlur}
                    aria-invalid={Boolean(getError('name'))}
                    aria-describedby={getErrorId('name')}
                  />
                  {renderError('name')}
                </label>

                <label className={styles.field}>
                  <span>Price</span>
                  <input
                    name="price"
                    type="number"
                    min="0"
                    step="1000"
                    className={fieldErrorClass('price')}
                    value={formData.price}
                    onChange={handleFieldChange}
                    onBlur={handleFieldBlur}
                    aria-invalid={Boolean(getError('price'))}
                    aria-describedby={getErrorId('price')}
                  />
                  {renderError('price')}
                </label>

                <label className={styles.field}>
                  <span>Category</span>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleFieldChange}
                    onBlur={handleFieldBlur}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </label>

                <label className={styles.field}>
                  <span>Manufacture Year</span>
                  <input
                    name="manufactureYear"
                    type="number"
                    min="1948"
                    className={fieldErrorClass('manufactureYear')}
                    value={formData.manufactureYear}
                    onChange={handleFieldChange}
                    onBlur={handleFieldBlur}
                    aria-invalid={Boolean(getError('manufactureYear'))}
                    aria-describedby={getErrorId('manufactureYear')}
                  />
                  {renderError('manufactureYear')}
                </label>

                <label className={`${styles.field} ${styles.fullWidth}`}>
                  <span>Thumbnail Image</span>
                  <input
                    name="thumbnailImage"
                    type="file"
                    accept="image/*"
                    className={fieldErrorClass('thumbnailFileName')}
                    onChange={handleFieldChange}
                    onBlur={handleFieldBlur}
                    aria-invalid={Boolean(getError('thumbnailFileName'))}
                    aria-describedby={getErrorId('thumbnailFileName')}
                  />
                  {formData.thumbnailPreview ? (
                    <div className={styles.thumbnailPreview}>
                      <img src={formData.thumbnailPreview} alt="Selected car thumbnail preview" />
                      <span>{formData.thumbnailFileName}</span>
                    </div>
                  ) : null}
                  {renderError('thumbnailFileName')}
                </label>

                <label className={styles.field}>
                  <span>Horse Power</span>
                  <input
                    name="horsepower"
                    type="number"
                    min="0"
                    className={fieldErrorClass('horsepower')}
                    value={formData.horsepower}
                    onChange={handleFieldChange}
                    onBlur={handleFieldBlur}
                    aria-invalid={Boolean(getError('horsepower'))}
                    aria-describedby={getErrorId('horsepower')}
                  />
                  {renderError('horsepower')}
                </label>

                <label className={styles.field}>
                  <span>Top Speed</span>
                  <input
                    name="topSpeed"
                    type="number"
                    min="0"
                    className={fieldErrorClass('topSpeed')}
                    value={formData.topSpeed}
                    onChange={handleFieldChange}
                    onBlur={handleFieldBlur}
                    aria-invalid={Boolean(getError('topSpeed'))}
                    aria-describedby={getErrorId('topSpeed')}
                  />
                  {renderError('topSpeed')}
                </label>

                <label className={styles.field}>
                  <span>Fuel Type</span>
                  <select
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleFieldChange}
                    onBlur={handleFieldBlur}
                  >
                    {fuelTypes.map((fuelType) => (
                      <option key={fuelType} value={fuelType}>
                        {fuelType}
                      </option>
                    ))}
                  </select>
                </label>

                <label className={styles.field}>
                  <span>Seating</span>
                  <input
                    name="seating"
                    type="number"
                    min="1"
                    className={fieldErrorClass('seating')}
                    value={formData.seating}
                    onChange={handleFieldChange}
                    onBlur={handleFieldBlur}
                    aria-invalid={Boolean(getError('seating'))}
                    aria-describedby={getErrorId('seating')}
                  />
                  {renderError('seating')}
                </label>

                <label className={`${styles.field} ${styles.fullWidth}`}>
                  <span>Description</span>
                  <textarea
                    name="description"
                    className={fieldErrorClass('description')}
                    value={formData.description}
                    onChange={handleFieldChange}
                    onBlur={handleFieldBlur}
                    rows="4"
                    aria-invalid={Boolean(getError('description'))}
                    aria-describedby={getErrorId('description')}
                  />
                  {renderError('description')}
                </label>

                <label className={`${styles.field} ${styles.fullWidth}`}>
                  <span>Available Colors</span>
                  <input
                    name="colors"
                    type="text"
                    className={fieldErrorClass('colors')}
                    value={formData.colors}
                    onChange={handleFieldChange}
                    onBlur={handleFieldBlur}
                    placeholder="Black, White, Guards Red"
                    aria-invalid={Boolean(getError('colors'))}
                    aria-describedby={getErrorId('colors')}
                  />
                  {renderError('colors')}
                </label>

                <fieldset
                  className={`${styles.fieldset} ${styles.fullWidth} ${
                    getError('wheels') ? styles.fieldsetError : ''
                  }`}
                  aria-invalid={Boolean(getError('wheels'))}
                  aria-describedby={getErrorId('wheels')}
                >
                  <legend>Available Wheels</legend>
                  <div className={styles.checkGrid}>
                    {wheelOptions.map((wheel) => (
                      <label className={styles.checkItem} key={wheel}>
                        <input
                          type="checkbox"
                          checked={formData.wheels.includes(wheel)}
                          onChange={() => handleWheelToggle(wheel)}
                        />
                        <span>{wheel}</span>
                      </label>
                    ))}
                  </div>
                  {renderError('wheels')}
                </fieldset>

                <label className={`${styles.field} ${styles.fullWidth}`}>
                  <span>3D Model File</span>
                  <input
                    name="modelFile"
                    type="file"
                    accept=".glb,.gltf,.obj,.fbx"
                    className={fieldErrorClass('modelFileName')}
                    onChange={handleFieldChange}
                    onBlur={handleFieldBlur}
                    aria-invalid={Boolean(getError('modelFileName'))}
                    aria-describedby={getErrorId('modelFileName')}
                  />
                  {formData.modelFileName ? (
                    <small className={styles.fileHint}>Selected: {formData.modelFileName}</small>
                  ) : null}
                  {renderError('modelFileName')}
                </label>

                <label className={`${styles.stockCheck} ${styles.fullWidth}`}>
                  <input
                    name="status"
                    type="checkbox"
                    checked={formData.status === 'In Stock'}
                    onChange={handleFieldChange}
                  />
                  <span>In Stock</span>
                </label>
              </div>

              <div className={styles.dialogActions}>
                <button className={styles.saveButton} type="submit">
                  <i className="fa-regular fa-floppy-disk"></i>
                  Save
                </button>
                <button className={styles.cancelButton} type="button" onClick={closeDialog}>
                  Cancel
                </button>
              </div>
            </form>
          </section>
        </div>
      ) : null}
    </main>
  );
}
