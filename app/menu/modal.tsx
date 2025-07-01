// components/Modal.tsx
import React from 'react';

interface MealPlan {
  name: string;
  description: string;
  components: string[];
  nutrition: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
    fiber: string;
    sodium: string;
  };
  additional: {
    servingSize: string;
    cookingTime: string;
    difficulty: string;
    allergens: string[];
    dietary: string[];
  };
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  mealPlan?: MealPlan;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, mealPlan }) => {
  if (!isOpen || !mealPlan) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>{mealPlan.name}</h2>
          <button onClick={onClose} style={styles.closeButton}>×</button>
        </div>
        
        <div style={styles.content}>
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Description</h3>
            <p style={styles.description}>{mealPlan.description}</p>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Components</h3>
            <ul style={styles.componentList}>
              {mealPlan.components.map((component, index) => (
                <li key={index} style={styles.componentItem}>{component}</li>
              ))}
            </ul>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Nutritional Information</h3>
            <div style={styles.nutritionGrid}>
              <div style={styles.nutritionItem}>
                <span style={styles.nutritionLabel}>Calories:</span>
                <span style={styles.nutritionValue}>{mealPlan.nutrition.calories}</span>
              </div>
              <div style={styles.nutritionItem}>
                <span style={styles.nutritionLabel}>Protein:</span>
                <span style={styles.nutritionValue}>{mealPlan.nutrition.protein}</span>
              </div>
              <div style={styles.nutritionItem}>
                <span style={styles.nutritionLabel}>Carbs:</span>
                <span style={styles.nutritionValue}>{mealPlan.nutrition.carbs}</span>
              </div>
              <div style={styles.nutritionItem}>
                <span style={styles.nutritionLabel}>Fat:</span>
                <span style={styles.nutritionValue}>{mealPlan.nutrition.fat}</span>
              </div>
              <div style={styles.nutritionItem}>
                <span style={styles.nutritionLabel}>Fiber:</span>
                <span style={styles.nutritionValue}>{mealPlan.nutrition.fiber}</span>
              </div>
              <div style={styles.nutritionItem}>
                <span style={styles.nutritionLabel}>Sodium:</span>
                <span style={styles.nutritionValue}>{mealPlan.nutrition.sodium}</span>
              </div>
            </div>
          </div>

          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Additional Information</h3>
            <div style={styles.additional}>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Serving Size:</span>
                <span style={styles.infoValue}>{mealPlan.additional.servingSize}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Cooking Time:</span>
                <span style={styles.infoValue}>{mealPlan.additional.cookingTime}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Difficulty:</span>
                <span style={styles.infoValue}>{mealPlan.additional.difficulty}</span>
              </div>
              
              {mealPlan.additional.allergens.length > 0 && (
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Allergens:</span>
                  <span style={styles.infoValue}>{mealPlan.additional.allergens.join(', ')}</span>
                </div>
              )}
              
              {mealPlan.additional.dietary.length > 0 && (
                <div style={styles.infoRow}>
                  <span style={styles.infoLabel}>Dietary:</span>
                  <span style={styles.infoValue}>{mealPlan.additional.dietary.join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={styles.footer}>
          <button onClick={onClose} style={styles.closeBtn}>Close</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  modal: {
    background: '#fff',
    borderRadius: '12px',
    maxWidth: '600px',
    width: '100%',
    maxHeight: '90vh',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 25px',
    borderBottom: '1px solid #eee',
    backgroundColor: '#A997DF',
    color: 'white',
  },
  title: {
    margin: 0,
    fontSize: '24px',
    fontWeight: '600',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    color: 'white',
    cursor: 'pointer',
    padding: '5px',
    borderRadius: '50%',
    width: '35px',
    height: '35px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: '25px',
    maxHeight: 'calc(90vh - 140px)',
    overflowY: 'auto' as const,
  },
  section: {
    marginBottom: '25px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#2D1B4E',
    marginBottom: '12px',
    borderBottom: '2px solid #A997DF',
    paddingBottom: '5px',
  },
  description: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#555',
    margin: 0,
  },
  componentList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  componentItem: {
    fontSize: '15px',
    padding: '8px 12px',
    backgroundColor: '#f8f9fa',
    marginBottom: '5px',
    borderRadius: '6px',
    borderLeft: '3px solid #A997DF',
  },
  nutritionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '12px',
  },
  nutritionItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 12px',
    backgroundColor: '#f1f3f4',
    borderRadius: '6px',
  },
  nutritionLabel: {
    fontWeight: '500',
    color: '#2D1B4E',
  },
  nutritionValue: {
    fontWeight: '600',
    color: '#A997DF',
  },
  additionalInfo: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #eee',
  },
  infoLabel: {
    fontWeight: '500',
    color: '#2D1B4E',
    flex: '0 0 120px',
  },
  infoValue: {
    color: '#555',
    textAlign: 'right' as const,
  },
  footer: {
    padding: '20px 25px',
    borderTop: '1px solid #eee',
    backgroundColor: '#f8f9fa',
    textAlign: 'center' as const,
  },
  closeBtn: {
    backgroundColor: '#A997DF',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'background-color 0.3s ease',
  },
};

export default Modal;